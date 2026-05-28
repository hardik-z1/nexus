import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadCounts: {},

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  markAsRead: async (messageId) => {
    try {
      await axiosInstance.put(`/messages/read/${messageId}`);
      set({
        messages: get().messages.map((m) =>
          m._id === messageId ? { ...m, read: true } : m
        ),
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  },

  clearUnread: (userId) => {
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [userId]: 0 },
    }));
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (isFromSelectedUser) {
        set({ messages: [...get().messages, newMessage] });
        get().markAsRead(newMessage._id);
      } else {
        // Increment unread count for sender
        set((state) => ({
          unreadCounts: {
            ...state.unreadCounts,
            [newMessage.senderId]: (state.unreadCounts[newMessage.senderId] || 0) + 1,
          },
        }));
      }
    });

    socket.on("messageRead", (messageId) => {
      set({
        messages: get().messages.map((m) =>
          m._id === messageId ? { ...m, read: true } : m
        ),
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messageRead");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));