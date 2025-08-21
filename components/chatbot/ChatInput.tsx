// import React, { useState, KeyboardEvent } from 'react';
// import { Send, Loader2 } from 'lucide-react';
// import { ChatInputProps } from './types/chatbot';

// const ChatInput: React.FC<ChatInputProps> = ({ 
//   onSendMessage, 
//   disabled = false, 
//   placeholder = "Type your message...",
//   isTyping = false
// }) => {
//   const [message, setMessage] = useState('');

//   const handleSend = () => {
//     if (message.trim() && !disabled && !isTyping) {
//       onSendMessage(message.trim());
//       setMessage('');
//     }
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="border-t border-gray-100 bg-white p-4">
//       <div className="flex gap-3 items-end">
//         <div className="flex-1 relative">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder={placeholder}
//             disabled={disabled || isTyping}
//             className="w-full resize-none border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm 
//                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600 
//                      focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed
//                      transition-all duration-200 max-h-32 min-h-[48px]"
//             rows={1}
//             style={{
//               height: 'auto',
//               minHeight: '48px',
//               maxHeight: '128px'
//             }}
//             onInput={(e) => {
//               const target = e.target as HTMLTextAreaElement;
//               target.style.height = 'auto';
//               target.style.height = Math.min(target.scrollHeight, 128) + 'px';
//             }}
//           />
//         </div>
        
//         <button
//           onClick={handleSend}
//           disabled={!message.trim() || disabled || isTyping}
//           className="flex-shrink-0 w-12 h-12 bg-orange-600 hover:bg-orange-600 disabled:bg-gray-300 
//                    text-white rounded-2xl flex items-center justify-center transition-all duration-200 
//                    hover:shadow-md disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
//         >
//           {isTyping ? (
//             <Loader2 size={18} className="animate-spin" />
//           ) : (
//             <Send size={18} />
//           )}
//         </button>
//       </div>
      
//       {isTyping && (
//         <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm animate-in fade-in duration-200">
//           <div className="flex gap-1">
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//           </div>
//           <span>Assistant is typing...</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInput;