import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Ensure this uses firebase-admin or can run on node
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { verifyEmailBackend } from '@/lib/emailVerifier';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formType, email, ...restData } = body;

    if (!formType || !email) {
      return NextResponse.json({ success: false, error: 'Missing formType or email' }, { status: 400 });
    }

    // 1. Validate Email using Backend Logic
    const verification = await verifyEmailBackend(email);

    // 2. Decide Routing Status based on single consistent policy
    let routingStatus = "application";
    let spamReason = "";

    // Policy: Invalid syntax, fake domains, or disposable emails -> Spam Vault
    if (['invalid', 'undeliverable', 'disposable'].includes(verification.status)) {
      routingStatus = "spam";
      spamReason = verification.reason || "Email failed backend verification";
    }

    // 3. Save directly to Firebase from Backend
    const collectionName = getCollectionForFormType(formType);
    
    const docData = {
      ...restData,
      formType,
      email,
      routingStatus,
      emailValidationStatus: verification.status,
      emailValidationReason: verification.reason || "",
      emailValidationCheckedAt: new Date().toISOString(),
      status: "new", // normal UI status
      spamReason: spamReason || null,
      submittedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, collectionName), docData);

    return NextResponse.json({ 
      success: true, 
      id: docRef.id, 
      routingStatus,
      emailValidationStatus: verification.status 
    });

  } catch (error: any) {
    console.error("API Form Submission Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// Map logical form types to database collections
function getCollectionForFormType(formType: string): string {
  const map: Record<string, string> = {
    'contact': 'contact_inquiries',
    'intern': 'intern_applications',
    'core_team': 'core_team_applications',
    'agentos': 'agentos_applications'
  };
  return map[formType] || 'misc_applications';
}
