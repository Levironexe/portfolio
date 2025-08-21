// import React from 'react';
// import { User } from 'lucide-react';
// import { ChatMessageProps } from './types/chatbot';

// const ChatMessage: React.FC<ChatMessageProps> = ({ 
//   message, 
//   botName = 'Assistant',
//   userAvatar,
//   botAvatar 
// }) => {
//   const isBot = message.sender === 'bot';
//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString('en-US', { 
//       hour: 'numeric', 
//       minute: '2-digit',
//       hour12: true 
//     });
//   };

//   return (
//     <div className={`flex gap-3 mb-6 animate-in slide-in-from-bottom-2 duration-300 ${
//       isBot ? 'justify-start' : 'justify-end'
//     }`}>
//       {isBot && (
//         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shadow-sm">

//         </div>
//       )}
      
//       <div className={`flex flex-col max-w-[80%] sm:max-w-[70%] ${
//         isBot ? 'items-start' : 'items-end'
//       }`}>
//         <div className={`px-4 py-3 rounded-2xl shadow-sm ${
//           isBot 
//             ? 'bg-white text-gray-800 rounded-tl-md border border-gray-100' 
//             : 'bg-orange-600 text-white rounded-tr-md'
//         }`}>
//           <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
//             {message.text}
//           </p>
//         </div>
//         <span className="text-xs text-gray-400 mt-1 px-1">
//           {formatTime(message.timestamp)}
//         </span>
//       </div>

//       {!isBot && (
//         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center shadow-sm">
//           {userAvatar ? (
//             <img src={userAvatar} alt="You" className="w-full h-full rounded-full object-cover" />
//           ) : (
//             <User size={16} className="text-white" />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatMessage;