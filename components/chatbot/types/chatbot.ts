export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  metadata?: {
    relevantDocuments: number;
    source: string;
  }
}

export interface ChatBotProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onTyping?: (isTyping: boolean) => void;
  isTyping?: boolean;
  placeholder?: string;
  botName?: string;
  userAvatar?: string;
  botAvatar?: string;
  className?: string;
  disabled?: boolean;
  toggle?: boolean;
}

export interface ChatMessageProps {
  message: Message;
  botName?: string;
  userAvatar?: string;
  botAvatar?: string;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  isTyping?: boolean;
}