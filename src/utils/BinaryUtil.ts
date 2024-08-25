export default class BinaryUtil {
  private binary: Buffer;

  public constructor(binary: Buffer) {
    this.binary = binary;
  }

  public pngBinaryToBase64() {
    return (
      "data:image/png;base64," + Buffer.from(this.binary).toString("base64")
    );
  }

  public getBinary() {
    return this.binary;
  }
}
