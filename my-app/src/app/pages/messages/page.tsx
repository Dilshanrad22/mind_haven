'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';
import type { Conversation, Message, User } from '@/types';

export default function MessagesPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ApiService.isAuthenticated()) {
      router.push('/pages/login');
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      const [userRes, convRes] = await Promise.all([
        ApiService.getCurrentUser(),
        ApiService.getConversations(),
      ]);
      if (userRes.success && userRes.data) setCurrentUser(userRes.data);
      if (convRes.success && convRes.data) setConversations(convRes.data);
    } catch {
      console.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conv: Conversation) => {
    setSelectedUser(conv);
    try {
      const res = await ApiService.getMessages(conv.userId);
      if (res.success && res.data) {
        setMessages(res.data);
        await ApiService.markMessagesRead(conv.userId);
        // Update unread count locally
        setConversations((prev) => prev.map((c) => c.userId === conv.userId ? { ...c, unreadCount: 0 } : c));
      }
    } catch {
      console.error('Failed to load messages');
    }
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    setSending(true);
    try {
      const res = await ApiService.sendMessage({ receiverId: selectedUser.userId, content: newMessage.trim() });
      if (res.success && res.data) {
        setMessages((prev) => [...prev, res.data!]);
        setNewMessage('');
        setConversations((prev) => prev.map((c) =>
          c.userId === selectedUser.userId ? { ...c, lastMessage: newMessage.trim(), lastMessageDate: new Date().toISOString() } : c
        ));
      }
    } catch {
      console.error('Failed to send');
    } finally {
      setSending(false);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const getSenderId = (msg: Message) => typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId;

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#00610B]" /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 h-screen flex">
        {/* Conversation List */}
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-[#16320D]">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No conversations yet</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <button key={conv.userId} onClick={() => selectConversation(conv)} className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 border-b text-left ${selectedUser?.userId === conv.userId ? 'bg-green-50' : ''}`}>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#00610B] font-bold flex-shrink-0">
                    {conv.user?.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-[#16320D] truncate">{conv.user?.name || 'User'}</span>
                      {conv.unreadCount > 0 && (
                        <span className="bg-[#00610B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{conv.unreadCount}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {!selectedUser ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">Select a conversation to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b bg-white flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#00610B] font-bold">
                  {selectedUser.user?.name?.charAt(0) || '?'}
                </div>
                <div>
                  <h3 className="font-bold text-[#16320D]">{selectedUser.user?.name}</h3>
                  <p className="text-xs text-gray-500">{selectedUser.user?.userType === 'doctor' ? 'Counsellor' : 'Patient'}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg) => {
                  const isMe = currentUser && getSenderId(msg) === currentUser._id;
                  return (
                    <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isMe ? 'bg-[#00610B] text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm'}`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${isMe ? 'text-green-200' : 'text-gray-400'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} placeholder="Type a message..." className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#00610B] outline-none" />
                  <button type="button" title="Send message" onClick={handleSend} disabled={sending || !newMessage.trim()} className="w-12 h-12 bg-[#00610B] rounded-full flex items-center justify-center text-white hover:bg-[#16320D] disabled:opacity-50 transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
