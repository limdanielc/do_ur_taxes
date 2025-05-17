const OSS = require('ali-oss');
const config = require('../config/config');

class OSSUtil {
  constructor() {
    this.client = new OSS({
      region: config.ossConfig.region,
      accessKeyId: config.ossConfig.accessKeyId,
      accessKeySecret: config.ossConfig.accessKeySecret,
      bucket: config.ossConfig.bucket
    });
  }

  /**
   * Upload a file to OSS
   * @param {string} filename - The name to save the file as
   * @param {Buffer} fileBuffer - The file content as a Buffer
   * @param {string} userId - User ID for organizing files in folders
   * @returns {Promise<Object>} - OSS upload result containing URL
   */
  async uploadFile(filename, fileBuffer, userId) {
    try {
      // Organize files by user ID and current date
      const date = new Date();
      const key = `receipts/${userId}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getTime()}-${filename}`;
      
      const result = await this.client.put(key, fileBuffer);
      return {
        url: result.url,
        key: result.name
      };
    } catch (error) {
      console.error('OSS upload error:', error);
      throw new Error('Failed to upload file to OSS');
    }
  }

  /**
   * Delete a file from OSS
   * @param {string} key - The OSS object key to delete
   * @returns {Promise<void>}
   */
  async deleteFile(key) {
    try {
      await this.client.delete(key);
    } catch (error) {
      console.error('OSS delete error:', error);
      throw new Error('Failed to delete file from OSS');
    }
  }

  /**
   * Get a file from OSS
   * @param {string} key - The OSS object key to get
   * @returns {Promise<Buffer>} - File content as Buffer
   */
  async getFile(key) {
    try {
      const result = await this.client.get(key);
      return result.content;
    } catch (error) {
      console.error('OSS get error:', error);
      throw new Error('Failed to get file from OSS');
    }
  }
}

// Export a singleton instance
module.exports = new OSSUtil();
