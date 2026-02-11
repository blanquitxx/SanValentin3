/// <reference types="vite/client" />

declare module "*.mp3" {
  const content: string;
  export default content;
}

declare module "*.mp3?url" {
  const content: string;
  export default content;
}
