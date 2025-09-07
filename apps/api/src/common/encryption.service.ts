import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm'
  private readonly key: Buffer

  constructor(private configService: ConfigService) {
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY')
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is required')
    }
    this.key = crypto.scryptSync(encryptionKey, 'salt', 32)
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(this.algorithm, this.key)
    cipher.setAAD(Buffer.from('rust-marketing-intelligence'))
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag = cipher.getAuthTag()
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
  }

  decrypt(encryptedText: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':')
    
    if (!ivHex || !authTagHex || !encrypted) {
      throw new Error('Invalid encrypted text format')
    }
    
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    
    const decipher = crypto.createDecipher(this.algorithm, this.key)
    decipher.setAAD(Buffer.from('rust-marketing-intelligence'))
    decipher.setAuthTag(authTag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }

  hash(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex')
  }

  generateRandomKey(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }
}
