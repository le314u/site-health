// ===== UTIL =====
const encoder = new TextEncoder();
const decoder = new TextDecoder();

// ===== CONFIGURAÇÕES CRIPTO =====
const ITERATIONS = 100000;
const KEY_LENGTH = 256;
const HASH = "SHA-256";

// ⚠️ Salt fixo (ok pro seu caso, pois é front-only)
const SALT = encoder.encode("dogtag-health-salt");

// ===== DERIVA CHAVE DA SENHA =====
async function deriveKey(password) {
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
      hash: HASH
    },
    baseKey,
    {
      name: "AES-GCM",
      length: KEY_LENGTH
    },
    false,
    ["encrypt", "decrypt"]
  );
}

// ===== CRIPTOGRAFAR =====
async function encryptData(plainText, password) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password);

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    encoder.encode(plainText)
  );

  return {
    alg: "AES-GCM",
    iv: btoa(String.fromCharCode(...iv)),
    data: btoa(
      String.fromCharCode(...new Uint8Array(encryptedBuffer))
    )
  };
}

// ===== BIND NO HTML =====
document.querySelector("button")?.addEventListener("click", async () => {
  const text = document.querySelector("textarea")?.value;
  const password = document.querySelector("input[type=password]")?.value;

  if (!text || !password) {
    alert("Preencha texto e senha");
    return;
  }

  try {
    const encrypted = await encryptData(text, password);

    console.log("DADOS CRIPTOGRAFADOS:");
    console.log(encrypted);

    alert(
      "Criptografado com sucesso!\n\n" 
    );

    console.log(
      "Criptografado com sucesso!\n\n" +
      JSON.stringify(encrypted, null, 2)
    );

    

  } catch (err) {
    console.error(err);
    alert("Erro ao criptografar");
  }
});
