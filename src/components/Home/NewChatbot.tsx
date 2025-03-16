// import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
// import { buildTheme } from "@botpress/webchat-generator";
// import { useEffect, useState } from "react";
// const { theme, style } = buildTheme({
//   themeName: "prism",
//   themeColor: "#634433",
// });
// //Add your Client ID here ⬇️
// const clientId = "7227f08d-8688-49f6-966a-97697063ea1f";
// export default function NewChatbot() {
//     const client = getClient({ clientId });
//     const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  
//     const toggleWebchat = () => setIsWebchatOpen((prev) => !prev);
  
//     // Apply the theme using `window.botpressWebChat.init`
//     useEffect(() => {
//       if (window.botpressWebChat) {
//         window.botpressWebChat.init({
//           clientId,
//           theme,
//         });
//       }
//     }, []);
  
//     return (
//       <div style={{ width: "100vw", height: "100vh" }}>
//         {/* Inject theme styles */}
//         <style>{style}</style>
  
//         <WebchatProvider client={client}>
//           <Fab onClick={toggleWebchat} />
//           {isWebchatOpen && <Webchat />}
//         </WebchatProvider>
//       </div>
//     );
//   }