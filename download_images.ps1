# PowerShell script to download images using curl.exe

$dir = "c:\Users\Master\Downloads\FUTECX-main\FUTECX-main\Startup-main\futecx-next\public\image\projects"
if (-not (Test-Path -Path $dir)) {
    New-Item -ItemType Directory -Path $dir | Out-Null
}

$images = @(
    @{ Name = "chatlse.jpg"; Prompt = "Futuristic highly detailed glowing chat application UI floating in a dark cyberpunk space hologram interface neon cyan 8k" },
    @{ Name = "meera-write.jpg"; Prompt = "Advanced glowing AI text generation software interface dark mode holographic data blocks glowing orange blue cyberpunk 8k" },
    @{ Name = "attendance.jpg"; Prompt = "Futuristic corporate biometric security dashboard glowing fingerprint scan UI elements dark blue tech background 8k" },
    @{ Name = "student-ai.jpg"; Prompt = "Futuristic digital education web interface glowing holographic books smart learning analytics dashboard glowing blue 8k" },
    @{ Name = "eduflex.jpg"; Prompt = "Vast digital ecosystem of learning glowing network nodes dark space background with neon connections UI dashboard 8k" },
    @{ Name = "bujji.jpg"; Prompt = "Futuristic smart mobility UI glowing GPS map with neon travel routes autonomous driving dashboard dark theme 8k" },
    @{ Name = "bujji-full.jpg"; Prompt = "High-tech geospatial analytics dashboard glowing 3D earth hologram with satellite data points navigation UI cyberpunk 8k" },
    @{ Name = "insight.jpg"; Prompt = "Advanced AI data analytics dashboard glowing 3D charts and financial graphs floating in dark space neon pink cyan 8k" },
    @{ Name = "traffic-emergency.jpg"; Prompt = "Top-down smart city traffic monitoring UI glowing red and green routes on a dark map emergency vehicle pathfinding 8k" },
    @{ Name = "saimeera.jpg"; Prompt = "Futuristic digital business platform interface glowing e-commerce metrics corporate branding dark mode neon lights 8k" },
    @{ Name = "agentos.jpg"; Prompt = "Massive multi-model AI agent architecture dashboard dark tech laboratory glowing blue logic gates complex server UI 8k" },
    @{ Name = "chess.jpg"; Prompt = "Futuristic digital chess board glowing neon pieces cyberpunk esports gaming atmosphere 8k UI" }
)

foreach ($img in $images) {
    $encodedPrompt = [uri]::EscapeDataString($img.Prompt)
    $url = "https://image.pollinations.ai/prompt/$encodedPrompt?width=800&height=600&nologo=true"
    $dest = Join-Path -Path $dir -ChildPath $img.Name
    
    Write-Host "Downloading $($img.Name)..."
    # Use curl.exe directly with -L to follow redirects and -s for silent, -S for show error
    curl.exe -L -s -S -o $dest $url
    
    # Check if file size is > 50kb
    if ((Get-Item $dest).length -gt 50000) {
        Write-Host "Successfully downloaded $($img.Name)"
    } else {
        Write-Host "File $($img.Name) is too small, redownloading..."
        curl.exe -L -s -S -o $dest $url
    }
}

Write-Host "Done downloading all images."
