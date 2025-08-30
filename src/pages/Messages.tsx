import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Send, Search, Phone, Video, MoreVertical, 
  MessageCircle, Clock, CheckCheck, Briefcase
} from "lucide-react";

const Messages = () => {
  const { user, userType } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: userType === 'worker' ? "BuildCorp NYC" : "John Smith",
      jobTitle: "Construction Helper",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      lastMessage: "Great! When can you start?",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      online: true,
      role: userType === 'worker' ? 'employer' : 'worker'
    },
    {
      id: 2,
      name: userType === 'worker' ? "QuickDelivery" : "Sarah Johnson",
      jobTitle: "Delivery Driver",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      lastMessage: "Thanks for your application. We'd like to schedule an interview.",
      lastMessageTime: "1 hour ago", 
      unreadCount: 0,
      online: false,
      role: userType === 'worker' ? 'employer' : 'worker'
    },
    {
      id: 3,
      name: userType === 'worker' ? "Events Plus" : "Mike Wilson",
      jobTitle: "Event Staff",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      lastMessage: "Perfect! See you tomorrow at 8 AM.",
      lastMessageTime: "3 hours ago",
      unreadCount: 0,
      online: true,
      role: userType === 'worker' ? 'employer' : 'worker'
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: 1,
      senderId: userType === 'worker' ? 2 : 1,
      senderName: userType === 'worker' ? "BuildCorp NYC" : "John Smith",
      content: "Hi! I saw your application for the construction helper position.",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      senderId: userType === 'worker' ? 1 : 2,
      senderName: user?.name || "You",
      content: "Hello! Yes, I'm very interested in this position. I have 5+ years of experience.",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      senderId: userType === 'worker' ? 2 : 1,
      senderName: userType === 'worker' ? "BuildCorp NYC" : "John Smith", 
      content: "That sounds great! Can you tell me more about your experience with residential projects?",
      timestamp: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      senderId: userType === 'worker' ? 1 : 2,
      senderName: user?.name || "You",
      content: "I've worked on several residential building projects including apartment complexes and single-family homes. I'm comfortable with framing, drywall, and general construction tasks.",
      timestamp: "10:37 AM",
      isOwn: true
    },
    {
      id: 5,
      senderId: userType === 'worker' ? 2 : 1,
      senderName: userType === 'worker' ? "BuildCorp NYC" : "John Smith",
      content: "Great! When can you start?",
      timestamp: "10:40 AM", 
      isOwn: false
    }
  ];

  const selectedChat = conversations.find(conv => conv.id === selectedConversation);
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send the message to the backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Communicate with {userType === 'worker' ? 'employers' : 'workers'} about job opportunities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Conversations ({conversations.length})
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedConversation === conversation.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <div className="flex items-center gap-2">
                          {conversation.unreadCount > 0 && (
                            <Badge variant="default" className="text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground truncate">
                          {conversation.jobTitle}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No conversations found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {selectedChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChat.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-3 h-3" />
                        {selectedChat.jobTitle}
                        {selectedChat.online && <span className="text-green-600">• Online</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.isOwn
                            ? 'bg-primary text-primary-foreground ml-4'
                            : 'bg-muted mr-4'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.isOwn && (
                            <CheckCheck className="w-3 h-3 opacity-70" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;