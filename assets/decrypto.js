


const encoder = new TextEncoder();
const decoder = new TextDecoder();

// ===== CONFIG =====
const SALT = encoder.encode("dogtag-health-salt");
const ITERATIONS = 100000;
// const ENCRYPTED_DATA

// ===== DERIVA CHAVE =====
async function getKey(password) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: SALT,
      iterations: ITERATIONS,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// ===== DESCRIPTOGRAFAR =====
async function decryptFromURL() {
  const password = window.location.hash.substring(1);
  console.log(password)

  if (!password) return;

  try {
    const key = await getKey(password);
    const iv = Uint8Array.from(atob(ENCRYPTED_DATA.iv), c => c.charCodeAt(0));
    const data = Uint8Array.from(atob(ENCRYPTED_DATA.data), c => c.charCodeAt(0));

    console.log('dec')
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    console.log(decoder.decode(decrypted))

    document.getElementById("output").innerHTML =
      decoder.decode(decrypted);

  } catch {
    alert("❌ Senha incorreta")
  }
}

// ===== CRIPTOGRAFAR =====
async function encrypt() {
  const text = document.getElementById("plainText").value;
  const password = document.getElementById("password").value;

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(password);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );

  const result = {
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(String.fromCharCode(...new Uint8Array(encrypted)))
  };

  document.getElementById("encryptedOutput").textContent =
    JSON.stringify(result, null, 2);
}


function clear(){
  history.replaceState(
    null,
    document.title,
    window.location.pathname
  );
}


decryptFromURL();
clear()