export type DataStatus = "valid" | "invalid" | "";
export type FilesToUpload = {
  [key in FileInputSection]: File | undefined;
};
export type FileInputSection = "cv" | "matricula" | "historico";
export type FileUploadEvent = {
  origin: FileInputSection;
  file: File;
};
