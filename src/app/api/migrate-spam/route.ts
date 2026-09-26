import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { verifyEmailBackend } from '@/lib/emailVerifier';

const COLLECTIONS = [
  'contact_inquiries',
  'intern_applications',
  'core_team_applications',
  'agentos_applications'
];

export async function GET(req: Request) {
  try {
    const results = [];
    let migratedCount = 0;

    for (const colName of COLLECTIONS) {
      const snapshot = await getDocs(collection(db, colName));
      for (const document of snapshot.docs) {
        const data = document.data();
        
        // Skip if already has routingStatus
        if (data.routingStatus) {
          continue; 
        }

        const email = data.email || "";
        const verification = await verifyEmailBackend(email);
        
        let routingStatus = "application";
        let spamReason = "";

        // If the old record was manually marked as spam, preserve it if we want? 
        // User said: "Existing records should be rechecked using the SAME validation and routing logic."
        if (['invalid', 'undeliverable', 'disposable'].includes(verification.status)) {
          routingStatus = "spam";
          spamReason = verification.reason || "Email failed backend verification";
        }

        // If the old record was literally marked status="spam" by the old frontend logic, let's keep it spam just in case?
        // But user asked to use the SAME new validation. We'll trust the new validation.
        if (data.status === "spam" && routingStatus === "application") {
           // It was previously caught by frontend, but passed backend. 
           // The frontend might have caught gibberish name. 
           // Let's keep it in spam if it was manually/frontend caught, OR reclassify? 
           // "Existing records should be rechecked using the SAME validation and routing logic. If invalid: routingStatus = spam. If valid: keep it in correct category."
           // Let's just follow the email verification strictly for the migration.
        }

        await updateDoc(doc(db, colName, document.id), {
          routingStatus: routingStatus,
          emailValidationStatus: verification.status,
          emailValidationReason: verification.reason || "",
          spamReason: spamReason || null,
          // Remove old status="spam" if it's now valid, to restore it to the UI
          ...(data.status === "spam" && routingStatus === "application" ? { status: "new" } : {})
        });

        migratedCount++;
        results.push({ id: document.id, email, status: verification.status, routingStatus });
      }
    }

    return NextResponse.json({ success: true, migratedCount, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
