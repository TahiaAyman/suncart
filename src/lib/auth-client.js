"use client";

import { useEffect, useState } from "react";

const USERS_KEY = "suncart_users";
const SESSION_KEY = "suncart_session";

const getUsers = () => {
  if (typeof window === "undefined") return [];

  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = () => {
  if (typeof window === "undefined") return null;

  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user }));
  window.dispatchEvent(new Event("suncart-auth-change"));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("suncart-auth-change"));
};

export const authClient = {
  useSession() {
    const [session, setSession] = useState(() => getSession());

    useEffect(() => {
      const loadSession = () => {
        setSession(getSession());
      };

      window.addEventListener("suncart-auth-change", loadSession);
      window.addEventListener("storage", loadSession);

      return () => {
        window.removeEventListener("suncart-auth-change", loadSession);
        window.removeEventListener("storage", loadSession);
      };
    }, []);

    return {
      data: session,
      isPending: false,
    };
  },

  signUp: {
    async email({ name, email, password, image }) {
      const users = getUsers();
      const cleanEmail = email.trim().toLowerCase();

      if (!name.trim()) {
        return { error: { message: "Name is required" } };
      }

      if (!cleanEmail) {
        return { error: { message: "Email is required" } };
      }

      if (!password || password.length < 8) {
        return {
          error: { message: "Password must be at least 8 characters" },
        };
      }

      const alreadyExists = users.find((user) => user.email === cleanEmail);

      if (alreadyExists) {
        return {
          error: { message: "This email is already registered" },
        };
      }

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: cleanEmail,
        password,
        image: image || "https://i.ibb.co/4pDNDk1/avatar.png",
      };

      users.push(newUser);
      saveUsers(users);

      return {
        data: {
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
          },
        },
        error: null,
      };
    },
  },

  signIn: {
    async email({ email, password }) {
      const users = getUsers();
      const cleanEmail = email.trim().toLowerCase();

      const user = users.find(
        (item) => item.email === cleanEmail && item.password === password
      );

      if (!user) {
        return {
          error: { message: "Invalid email or password" },
        };
      }

      const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      };

      saveSession(sessionUser);

      return {
        data: {
          user: sessionUser,
        },
        error: null,
      };
    },

    async social() {
      const demoUser = {
        id: "google-demo-user",
        name: "Google Demo User",
        email: "google.demo@suncart.com",
        image: "https://i.ibb.co/4pDNDk1/avatar.png",
      };

      saveSession(demoUser);

      return {
        data: {
          user: demoUser,
        },
        error: null,
      };
    },
  },

  async signOut() {
    clearSession();

    return {
      data: null,
      error: null,
    };
  },

  async updateUser({ name, email, image, password }) {
    const session = getSession();

    if (!session?.user) {
      return {
        error: { message: "User not logged in" },
      };
    }

    const users = getUsers();

    const currentEmail = session.user.email;
    const newEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      return {
        error: { message: "Name is required" },
      };
    }

    if (!newEmail) {
      return {
        error: { message: "Email is required" },
      };
    }

    if (!password || password.length < 8) {
      return {
        error: { message: "Password must be at least 8 characters" },
      };
    }

    const emailAlreadyUsed = users.find(
      (user) => user.email === newEmail && user.email !== currentEmail
    );

    if (emailAlreadyUsed) {
      return {
        error: { message: "This email is already used by another account" },
      };
    }

    const updatedUserForStorage = {
      id: session.user.id,
      name: name.trim(),
      email: newEmail,
      password,
      image: image || "https://i.ibb.co/4pDNDk1/avatar.png",
    };

    const updatedUsers = users.map((user) =>
      user.email === currentEmail ? updatedUserForStorage : user
    );

    saveUsers(updatedUsers);

    const updatedSessionUser = {
      id: updatedUserForStorage.id,
      name: updatedUserForStorage.name,
      email: updatedUserForStorage.email,
      image: updatedUserForStorage.image,
    };

    saveSession(updatedSessionUser);

    return {
      data: {
        user: updatedSessionUser,
      },
      error: null,
    };
  },
};