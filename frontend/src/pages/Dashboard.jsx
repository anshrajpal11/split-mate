import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalSpent: 0,
    totalOwe: 0,
    totalToReceive: 0,
    net: 0,
    groupsCount: 0,
    expensesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await api.get("/api/user/summary");
        if (res.data?.success) setSummary(res.data.summary);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Paid by you</CardDescription>
        </CardHeader>
        <CardContent>₹ {summary.totalSpent.toFixed(2)}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>You Owe</CardTitle>
          <CardDescription>To pay others</CardDescription>
        </CardHeader>
        <CardContent>₹ {summary.totalOwe.toFixed(2)}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>You Will Receive</CardTitle>
          <CardDescription>Others pay you</CardDescription>
        </CardHeader>
        <CardContent>₹ {summary.totalToReceive.toFixed(2)}</CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Net Balance</CardTitle>
          <CardDescription>Positive means you are owed</CardDescription>
        </CardHeader>
        <CardContent
          className={summary.net >= 0 ? "text-green-600" : "text-red-600"}
        >
          ₹ {summary.net.toFixed(2)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent>{summary.groupsCount}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>{summary.expensesCount}</CardContent>
      </Card>
    </div>
  );
}









