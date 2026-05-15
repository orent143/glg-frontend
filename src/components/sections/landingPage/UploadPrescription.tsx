"use client";

import UploadImage from "@/public/image29.png";
import Image1 from "@/public/123.png";
import Image2 from "@/public/124.png";
import Image3 from "@/public/125.png";
import Image from "next/image";
import { useState, useRef } from "react";

// Benefit component for improved code organization
const BenefitCard = ({ image, benefit }: { image: any; benefit: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#C50000]/10 flex items-center justify-center">
      <Image
        src={image}
        alt={benefit}
        width={24}
        height={24}
        className="w-6 h-6"
      />
    </div>
    <div className="flex-1 pt-1">
      <p className="text-sm font-medium text-[#1F2937] leading-relaxed">
        {benefit}
      </p>
    </div>
  </div>
);

const VALID_FILE_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function UploadPrescription() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIncomingFile = (file?: File) => {
    if (!file || !isValidFile(file)) {
      return;
    }

    processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleIncomingFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    handleIncomingFile(e.dataTransfer.files?.[0]);
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setPreviewUrl("");

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidFile = (file: File): boolean => {
    return VALID_FILE_TYPES.has(file.type) && file.size <= MAX_FILE_SIZE;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (uploadedFile) {
      setIsUploading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsUploading(false);
      setIsUploaded(true);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setIsUploaded(false);
    setIsUploading(false);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const benefits = [
    { id: 1, benefit: "Verified by licensed pharmacists", image: Image1 },
    { id: 2, benefit: "Fast and secure processing", image: Image2 },
    { id: 3, benefit: "Secure & confidential", image: Image3 },
  ];

  const hasImagePreview = uploadedFile?.type.startsWith("image/") && previewUrl;

  return (
    <section className="w-full bg-gradient-to-b from-white via-white to-[#F9FAFB] py-8 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="flex flex-col w-full lg:w-1/2">
            <div className="mb-8 md:mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-3 mb-3 md:mb-4 px-3 md:px-4 py-2 bg-[#FEE2E2] rounded-full">
                <Image
                  src={UploadImage}
                  alt="Prescription"
                  width={20}
                  height={20}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
                <span className="text-[10px] md:text-xs font-semibold text-[#991B1B] uppercase tracking-wide">
                  Easy & Secure
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2937] mb-3 md:mb-4 leading-tight">
                Upload Your <span className="text-[#C50000]">Prescription</span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-[#6B7280] font-light max-w-2xl leading-relaxed">
                Skip the lines. Upload your doctor's prescription and let our
                licensed pharmacists verify and process it. Fast, secure, and
                completely confidential.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-[#6B7280] uppercase tracking-wide mb-4 md:mb-6">
                  Why choose us
                </h3>
              </div>

              {benefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  image={benefit.image}
                  benefit={benefit.benefit}
                />
              ))}

              {/* Trust Badge */}
              <div className="pt-6 md:pt-8 border-t border-[#E5E7EB]">
                <p className="text-xs text-[#9CA3AF] font-medium mb-3 md:mb-4 uppercase tracking-wide">
                  Verified & Trusted
                </p>
                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <svg
                    className="w-5 h-5 text-[#C50000] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Licensed Pharmacy Partners
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upload Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 border-b border-[#E5E7EB] bg-gradient-to-r from-[#FAFAFA] to-white">
                <h2 className="text-base md:text-lg font-light text-[#1F2937]">
                  {isUploaded ? "Prescription Received" : "Upload Prescription"}
                </h2>
              </div>

              {/* Card Content */}
              <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
                {!uploadedFile ? (
                  /* Empty State - Drag & Drop */
                  <div
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ${isDragging
                        ? "border-[#C50000] bg-[#FEE2E2]/30"
                        : "border-[#D1D5DB] bg-[#F9FAFB] hover:bg-[#F3F4F6] hover:border-[#C50000]/30"
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <div className="py-8 md:py-12 px-4 md:px-6 text-center">
                      <div className="mb-3 md:mb-4 flex justify-center">
                        <div
                          className={`p-3 rounded-lg transition-colors duration-300 ${isDragging ? "bg-[#C50000]/10" : "bg-[#E5E7EB]/50"
                            }`}
                        >
                          <svg
                            className={`w-6 md:w-8 h-6 md:h-8 transition-colors duration-300 ${isDragging ? "text-[#C50000]" : "text-[#9CA3AF]"
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                      </div>

                      <p className="mb-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="font-semibold text-[#C50000] hover:text-[#A40000] transition-colors duration-150 text-sm md:text-base"
                        >
                          Click to upload
                        </button>
                        <span className="text-[#6B7280] font-light text-sm md:text-base">
                          {" "}
                          or drag and drop
                        </span>
                      </p>

                      <p className="text-xs md:text-sm text-[#9CA3AF] font-light">
                        PDF, JPG, or PNG (up to 10MB)
                      </p>
                    </div>
                  </div>
                ) : isUploaded ? (
                  /* Success State */
                  <div className="py-6 md:py-8">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-4 md:mb-6">
                      <div className="w-14 md:w-16 h-14 md:h-16 rounded-full bg-gradient-to-br from-[#DCFCE7] to-[#F0FDF4] flex items-center justify-center">
                        <svg
                          className="w-6 md:w-8 h-6 md:h-8 text-[#16A34A]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-[#1F2937] text-center mb-2">
                      Prescription received
                    </h3>
                    <p className="text-xs md:text-sm text-[#6B7280] text-center mb-6 md:mb-8">
                      Your prescription is being verified by our licensed
                      pharmacists.
                    </p>

                    {/* File Info Card */}
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 md:p-4 mb-6 md:mb-8">
                      <div className="flex items-center gap-3 md:gap-4">
                        {hasImagePreview ? (
                          <div className="w-12 md:w-14 h-12 md:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#E5E7EB]">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 md:w-14 h-12 md:h-14 bg-[#FEE2E2] rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-6 md:w-7 h-6 md:h-7 text-[#C50000]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 2.414l4.293 4.293a1 1 0 01.187.12l.12.127V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-semibold text-[#1F2937] truncate">
                            {uploadedFile?.name}
                          </p>
                          <p className="text-xs text-[#9CA3AF] mt-1">
                            {formatFileSize(uploadedFile?.size || 0)}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                            <p className="text-xs text-[#6B7280]">
                              Verification in progress
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 mb-6 md:mb-8">
                      <div className="flex gap-3">
                        <svg
                          className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-xs md:text-sm font-semibold text-blue-900">
                            Usually verified within 2 hours
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            We'll notify you once your prescription is ready for
                            processing.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full py-2 md:py-2.5 px-4 text-xs md:text-sm font-medium text-[#6B7280] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors duration-150"
                    >
                      Upload Another File
                    </button>
                  </div>
                ) : (
                  /* File Selected State (Before Upload) */
                  <div className="py-6 md:py-8">
                    {/* File Preview */}
                    <div className="flex justify-center mb-6 md:mb-8">
                      {hasImagePreview ? (
                        <div className="w-16 md:w-20 h-16 md:h-20 rounded-xl overflow-hidden bg-[#E5E7EB] shadow-sm">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] rounded-xl flex items-center justify-center shadow-sm">
                          <svg
                            className="w-8 md:w-10 h-8 md:h-10 text-[#C50000]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 2.414l4.293 4.293a1 1 0 01.187.12l.12.127V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-[#1F2937] mb-1 text-center truncate">
                      {uploadedFile?.name}
                    </h3>
                    <p className="text-xs md:text-sm text-[#6B7280] text-center mb-6 md:mb-8">
                      {formatFileSize(uploadedFile?.size || 0)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full py-2 md:py-3 px-4 font-semibold text-white text-sm md:text-base bg-[#C50000] hover:bg-[#A40000] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed transition-colors duration-150 rounded-lg"
                      >
                        {isUploading ? "Uploading..." : "Upload Prescription"}
                      </button>

                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm font-medium text-[#6B7280] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors duration-150"
                        >
                          Change File
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm font-medium text-[#6B7280] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors duration-150"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    {/* Reassurance Text */}
                    <p className="text-xs text-[#9CA3AF] text-center mt-4 md:mt-6 leading-relaxed">
                      Your prescription is encrypted and processed securely.
                      We'll verify it with licensed pharmacists.
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-[#F9FAFB] border-t border-[#E5E7EB]">
                <p className="text-xs text-[#9CA3AF] text-center">
                  <span className="font-semibold">Supported formats:</span> PDF,
                  JPG, PNG • <span className="font-semibold">Max size:</span>{" "}
                  10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
