"use client";
import { getUserDetails } from "@/app/_actions/actions";
import { useClerk } from "@clerk/nextjs";
import { Folder, User } from "@prisma/client";
import React, { useContext, useEffect } from "react";

const GlobalContext = React.createContext<{
  clientUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  selectedFolder: number;
  setSelectedFolder: React.Dispatch<React.SetStateAction<number>>;
}>({
  clientUser: null,
  isLoading: true,
  isAuthenticated: false,
  selectedFolder: 0,
  setSelectedFolder: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useClerk();
  console.log(user);
  const [clientUser, setClientUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState<number>(0);

  useEffect(() => {
    console.log(selectedFolder);
  }, [selectedFolder]);

  React.useEffect(() => {
    if (!user) {
      setClientUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
    const authHandler = async () => {
      try {
        const userDetails = await getUserDetails(
          user!.id,
          user!.primaryEmailAddress!.emailAddress,
          user!.fullName!,
        );
        setClientUser(userDetails.data);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(user);
    authHandler();
  }, [user]);

  if (isLoading) {
    return (
      <div className="fixed z-[100] flex items-center justify-center bg-background">
        Loading...
      </div>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        clientUser,
        isLoading,
        isAuthenticated,
        selectedFolder,
        setSelectedFolder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within the GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
