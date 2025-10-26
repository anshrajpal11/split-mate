"use client";

import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, User, Plus, Users, Receipt, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GroupDetails({ group }) {
  const params = useParams();
  const groupId = params?.id;

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const [settlements, setSettlements] = useState([]);

  useEffect(() => {
    async function getMembers() {
      try {
        setLoadingMembers(true);
        const res = await api.get(`/api/group/members/${groupId}`);
        setMembers(res.data.members || []);
      } catch (err) {
        toast.error("Failed to fetch members");
      } finally {
        setLoadingMembers(false);
      }
    }
    if (groupId) getMembers();
  }, [groupId]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const res = await api.get(`/api/group/expense/get/${groupId}`);
        setExpenses(res.data?.expenses || []);
      } catch (err) {
        toast.error("Failed to fetch expenses");
      }
    }
    if (groupId) getExpenses();
  }, [groupId]);

  useEffect(() => {
    async function fetchSettlements() {
      try {
        const res = await api.get(`/api/group/settlements/get/${groupId}`);
        setSettlements(res.data?.settlements || []);
      } catch (err) {
        // silent
      }
    }
    if (groupId) fetchSettlements();
  }, [groupId]);

  async function handleAddMember() {
    try {
      const res = await api.post(`/api/group/add/${groupId}`, {
        username: newMemberName,
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Member added successfully");
        setNewMemberName("");
        setAddMemberOpen(false);
        setMembers((prev) => [...prev, { username: newMemberName, email: "" }]);
      } else {
        toast.error(res.data?.message || "Failed to add member");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add member");
    }
  }

  async function handleAddExpense() {
    try {
      const res = await api.post(`/api/group/expense/add/${groupId}`, {
        expenseName,
        amount: Number(expenseAmount),
        expenseDate,
        paidBy,
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Expense added successfully");
        setExpenseName("");
        setExpenseAmount("");
        setExpenseDate("");
        setPaidBy("");
        // refresh expenses
        try {
          const getRes = await api.get(`/api/group/expense/get/${groupId}`);
          setExpenses(getRes.data?.expenses || []);
        } catch {}
      } else {
        toast.error(res.data?.message || "Failed to add expense");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add expense");
    }
  }

  async function handleRecomputeSettlements() {
    try {
      const res = await api.post(`/api/group/settlements/compute/${groupId}`);
      if (res.data?.success) {
        setSettlements(res.data?.settlements || []);
        toast.success("Settlements recomputed");
      } else {
        toast.error(res.data?.message || "Failed to recompute settlements");
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Failed to recompute settlements"
      );
    }
  }

  function getInitials(name) {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  const counts = useMemo(
    () => ({
      members: members.length,
      expenses: expenses.length,
      settlements: settlements.length,
    }),
    [members.length, expenses.length, settlements.length]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-balance">
            {group?.name || "Group"}
          </CardTitle>
          <CardDescription className="text-pretty">
            Manage your group details here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="rounded-md border p-4 text-center bg-card">
              <div className="text-sm text-muted-foreground">Members</div>
              <div className="text-xl font-semibold">{counts.members}</div>
            </div>
            <div className="rounded-md border p-4 text-center bg-card">
              <div className="text-sm text-muted-foreground">Expenses</div>
              <div className="text-xl font-semibold">{counts.expenses}</div>
            </div>
            <div className="rounded-md border p-4 text-center bg-card">
              <div className="text-sm text-muted-foreground">Settlements</div>
              <div className="text-xl font-semibold">{counts.settlements}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="members" className="space-y-6">
        <div className="sticky top-0 z-10 bg-background/80 supports-[backdrop-filter]:bg-background/60 backdrop-blur rounded-lg border">
          <TabsList className="w-full grid grid-cols-3 bg-transparent p-1 gap-1">
            <TabsTrigger
              value="members"
              className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted"
              aria-label={`Members ${counts.members}`}
            >
              <Users className="h-4 w-4" />
              <span className="text-pretty">Members</span>
              <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
                {counts.members}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted"
              aria-label={`Expenses ${counts.expenses}`}
            >
              <Receipt className="h-4 w-4" />
              <span className="text-pretty">Expenses</span>
              <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
                {counts.expenses}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="settlements"
              className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted"
              aria-label={`Settlements ${counts.settlements}`}
            >
              <Scale className="h-4 w-4" />
              <span className="text-pretty">Settlements</span>
              <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] leading-none text-muted-foreground">
                {counts.settlements}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
              <DialogTrigger asChild>
                <Button>
                  <User className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add a member</DialogTitle>
                  <div className="text-sm text-muted-foreground">
                    Enter an existing user's username to add.
                  </div>
                </DialogHeader>
                <div className="grid gap-3 mt-2">
                  <Label htmlFor="new-member">Username</Label>
                  <Input
                    id="new-member"
                    placeholder="e.g., alex123"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                  />
                </div>
                <DialogFooter className="gap-2 mt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setAddMemberOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddMember}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {loadingMembers ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="flex gap-4 py-6">
                    <div className="h-14 w-14 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-muted rounded" />
                      <div className="h-3 w-1/2 bg-muted rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((m, idx) => (
                <Card key={idx} className="hover:bg-accent transition-colors">
                  <CardContent className="flex gap-4 py-6">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="text-base font-semibold">
                        {getInitials(m?.username)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{m?.username}</h3>
                        <Badge variant="secondary">Member</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs">{m?.email || "—"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {members.length === 0 && !loadingMembers && (
                <Card>
                  <CardContent className="py-6">
                    <p className="text-sm text-muted-foreground">
                      No members yet. Use “Add Member” to invite someone.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Expense</CardTitle>
              <CardDescription>Quickly record a new expense.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Input
                placeholder="Expense title"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />
              <Input
                placeholder="Amount"
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
              <Select value={paidBy} onValueChange={(val) => setPaidBy(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Paid by" />
                </SelectTrigger>
                <SelectContent>
                  {members.length > 0 ? (
                    members.map((m, i) => (
                      <SelectItem key={i} value={m?.username || `user-${i}`}>
                        {m?.username || `User ${i + 1}`}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="unknown">Unknown</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
              <Button onClick={handleAddExpense} className="md:col-span-1">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Expenses</CardTitle>
              <CardDescription>A summary of recorded expenses.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Title</TableHead>
                      <TableHead className="min-w-[120px] text-right">
                        Amount
                      </TableHead>
                      <TableHead className="min-w-[140px]">Paid By</TableHead>
                      <TableHead className="min-w-[140px]">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((e) => (
                      <TableRow key={e._id} className="hover:bg-accent/50">
                        <TableCell className="font-medium flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                          {e.expenseName}
                        </TableCell>
                        <TableCell className="text-right">
                          ₹ {e.amount}
                        </TableCell>
                        <TableCell>{e?.paidBy?.username || "—"}</TableCell>
                        <TableCell>
                          {e?.expenseDate
                            ? new Date(e.expenseDate).toLocaleDateString()
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settlements Tab */}
        <TabsContent value="settlements" className="space-y-3">
          <div className="flex justify-end">
            <Button onClick={handleRecomputeSettlements}>Recompute</Button>
          </div>
          {settlements.length === 0 && (
            <Card>
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">
                  No settlements yet.
                </p>
              </CardContent>
            </Card>
          )}
          {settlements.map((s) => (
            <Card key={s._id} className="hover:bg-accent transition-colors">
              <CardContent className="flex items-center justify-between py-5">
                <div className="space-y-1">
                  <div className="font-medium">
                    {s?.payer?.username} pays {s?.payee?.username}
                  </div>
                </div>
                <span className="rounded-md bg-secondary px-2 py-1 text-sm">
                  ₹ {s.amount}
                </span>
                {s.status !== "settled" ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={async () => {
                      try {
                        const res = await api.post(`/api/group/settlements/settle/${s._id}`);
                        if (res.data?.success) {
                          setSettlements((prev) =>
                            prev.map((it) =>
                              it._id === s._id
                                ? {
                                    ...it,
                                    status: "settled",
                                    settledAt: new Date().toISOString(),
                                  }
                                : it
                            )
                          );
                          toast.success("Marked as settled");
                        } else {
                          toast.error(res.data?.message || "Failed to settle");
                        }
                      } catch (e) {
                        toast.error(
                          e?.response?.data?.message || "Failed to settle"
                        );
                      }
                    }}
                  >
                    Settle
                  </Button>
                ) : (
                  <Badge variant="secondary">Settled</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
