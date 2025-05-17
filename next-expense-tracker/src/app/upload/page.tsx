"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to categorize page
    router.push("/categorize");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upload Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Receipt Image or PDF
                </label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <p className="text-xs text-neutral-500">
                  Supported formats: JPEG, PNG, PDF
                </p>
              </div>

              {file && (
                <div className="text-sm">
                  Selected file: <span className="font-medium">{file.name}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={!file || isUploading}
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  "Upload Receipt"
                )}
              </Button>
            </form>

            {/* Upload Tips */}
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h3 className="font-medium text-primary mb-3">Upload Tips</h3>
              <ul className="text-sm text-primary/80 space-y-2">
                <li>• Ensure the receipt is well-lit and clear</li>
                <li>• Include the full receipt in the image</li>
                <li>• Make sure all text is readable</li>
                <li>• PDF files should be properly scanned</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
