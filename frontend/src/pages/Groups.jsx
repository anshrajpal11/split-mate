import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import api, { BASE } from "@/lib/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [groupName, setGroupName] = useState("");

  // Add Members dialog state
  const [openAddMembers, setOpenAddMembers] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    const socket = io(BASE, {
      withCredentials: true,
    });

    socket.on("groupCreated", (newGroup) => {
      setGroups((prev) => [...prev, newGroup]);
      toast.success(`New group created: ${newGroup.groupName}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await api.get("/api/group/get");
        if (res.data.success) setGroups(res.data.groups);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch groups");
      }
    };
    getGroups();
  }, []);

  const handleCreate = async () => {
    if (!groupName.trim()) return;
    const res = await api.post("/api/group/create", { groupName });
    if (res.data.success) {
      setGroups((prev) => [res.data.group, ...prev]);
      setOpenCreate(false);
      setGroupName("");
      toast.success("Group created");
    }
  };

  const handleAddMember = async () => {
    if (!memberName.trim()) return;
    try {
      // Placeholder: just showing toast for now
      toast.success(`${memberName} added to group`);
      setOpenAddMembers(false);
      setMemberName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add member");
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header & Create Group Dialog */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold">
            SPLITMATE Groups
          </h1>
          <p className="text-muted-foreground">
            Review your money-splitting groups and create new ones.
          </p>
        </div>

        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button>Create New Group</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a new group</DialogTitle>
              <DialogDescription>
                Add a name to create the group.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="group-name">Group name</Label>
                <Input
                  id="group-name"
                  placeholder="e.g., Summer Europe Trip"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:justify-end">
              <Button variant="secondary" onClick={() => setOpenCreate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      {/* Groups List */}
      {groups.length === 0 ? (
        <Card role="status" aria-live="polite">
          <CardHeader>
            <CardTitle>No groups yet</CardTitle>
            <CardDescription>
              Create your first group to start splitting and managing expenses.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <Card key={g._id} className="transition-colors hover:bg-accent/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-pretty">{g.groupName}</span>
                  <span className="text-sm text-muted-foreground">
                    {g.members?.length || 0} members
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm text-muted-foreground">
                    Total balance: $100
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Link to={`/group/${g._id}`} variant="secondary">
                  View details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
}
