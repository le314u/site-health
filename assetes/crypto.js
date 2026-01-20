// ===== DADOS CRIPTOGRAFADOS =====
// Estes valores você gera OFFLINE e cola aqui

const encryptedPayload = {
  salt: "wZ2F8ZK7b4Ew+0H1Z5xg8A==",
  iv: "T9mL0yFJ8MZ9uQkK",
  data: "G6tY0r2K9z8pF6d4vU6b7+8v2q8="
}

// ================================

async function deriveKey(token, saltB64) {
  const enc = new TextEncoder()

  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(token),
    "PBKDF2",
    false,
    ["deriveKey"]
  )

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltB64),
      iterations: 100000,
      hash: "SHA-256"
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  )
}

async function decryptData() {
  try {
    const token = location.hash.slice(1)
    if (!token) throw new Error("Token ausente")

    const key = await deriveKey(token, encryptedPayload.salt)

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToBytes(encryptedPayload.iv)
      },
      key,
      base64ToBytes(encryptedPayload.data)
    )

    document.getElementById("content").textContent =
      new TextDecoder().decode(decrypted)

  } catch (err) {
    document.getElementById("content").textContent =
      "Informações indisponíveis."
  }
}

function base64ToBytes(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}

decryptData()
