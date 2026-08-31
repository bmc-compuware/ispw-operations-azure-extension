import * as crypto from "crypto";

export class PasswordCryptoUtil {
  private static readonly PREFIX = "enc:gcm:v1:";
  private static readonly TAG_LENGTH = 16;
  private static readonly IV_LENGTH = 12;
  private static readonly KEY_BASE64 =
    "9yfqRswQr746fbRtfnsHjz+OCjOzITupz1xT2x9Lvkw=";

  public static encrypt(plainText: string | undefined | null): string | null {
    if (plainText == null) {
      return null;
    }
    if (plainText.startsWith(PasswordCryptoUtil.PREFIX)) {
      return plainText;
    }

    const key = Buffer.from(PasswordCryptoUtil.KEY_BASE64, "base64");
    const iv = crypto.randomBytes(PasswordCryptoUtil.IV_LENGTH);
    const cipher = (crypto as any).createCipheriv("aes-256-gcm", key, iv, {
      authTagLength: PasswordCryptoUtil.TAG_LENGTH,
    }) as crypto.CipherGCM;

    const actualCipher = Buffer.concat([
      cipher.update(plainText, "utf8") as unknown as Uint8Array,
      cipher.final() as unknown as Uint8Array,
    ]);
    const tag = cipher.getAuthTag();

    return (
      PasswordCryptoUtil.PREFIX +
      PasswordCryptoUtil.toUnpaddedBase64(iv) +
      ":" +
      PasswordCryptoUtil.toUnpaddedBase64(tag) +
      ":" +
      PasswordCryptoUtil.toUnpaddedBase64(actualCipher)
    );
  }

  private static toUnpaddedBase64(value: Buffer): string {
    return value.toString("base64").replace(/=+$/, "");
  }


}
