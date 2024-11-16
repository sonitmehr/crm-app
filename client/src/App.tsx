import React, { useState, useEffect } from "react";
import { getCustomers, getOrders, getCampaigns, getAudiences, createCustomer, createOrder, createCampaign, createAudience } from './services/api';

interface Customer {
  _id: string;
  name: string;
  email: string;
  totalSpending: number;
  visits: number;
}

interface Order {
  _id: string;
  customerId: string;
  orderAmount: number;
  orderDate: string;
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface Audience {
  _id: string;
  name: string;
  criteria: Array<{ field: string; operator: string; value: number | string }>;
  description : string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [audiences, setAudiences] = useState<Audience[]>([]);

  const [newCustomer, setNewCustomer] = useState<Omit<Customer, "_id">>({
    name: "",
    email: "",
    totalSpending: 0,
    visits: 0,
  });

  const [newOrder, setNewOrder] = useState<Omit<Order, "_id">>({
    customerId: "",
    orderAmount: 0,
    orderDate: "",
  });

  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, "_id">>({
    name: "",
    description: "",
    status: "active",
    startDate: "",
    endDate: "",
  });

  const [newAudience, setNewAudience] = useState<Omit<Audience, "_id">>({
    name: "",
    criteria: [],
    description : "this is description"
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await getCustomers();
        setCustomers(customersData.data);

        const ordersData = await getOrders();
        setOrders(ordersData.data);

        const campaignsData = await getCampaigns();
        setCampaigns(campaignsData.data);

        const audiencesData = await getAudiences();
        setAudiences(audiencesData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // POST Customer
  const addCustomer = async () => {
    try {
      const response = await createCustomer(newCustomer);
      setCustomers([...customers, response.data]);
      setNewCustomer({ name: "", email: "", totalSpending: 0, visits: 0 });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // POST Order
  const addOrder = async () => {
    try {
      const response = await createOrder(newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({ customerId: "", orderAmount: 0, orderDate: "" });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // POST Campaign
  const addCampaign = async () => {
    try {
      const response = await createCampaign(newCampaign);
      setCampaigns([...campaigns, response.data]);
      setNewCampaign({ name: "", description: "", status: "active", startDate: "", endDate: "" });
    } catch (error) {
      console.error("Error adding campaign:", error);
    }
  };

  // POST Audience
  const addAudience = async () => {
    try {
      const response = await createAudience(newAudience);
      setAudiences([...audiences, response.data]);
      setNewAudience({ name: "", criteria: [] ,description : ""});
    } catch (error) {
      console.error("Error adding audience:", error);
    }
  };

  return (
    <div>
      <h1>React CRUD Operations with TypeScript</h1>

      {/* Customers */}
      <div>
        <h2>Customers</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCustomer();
          }}
        >
          <input
            type="text"
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Customer Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Total Spending"
            value={newCustomer.totalSpending}
            onChange={(e) => setNewCustomer({ ...newCustomer, totalSpending: parseFloat(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Visits"
            value={newCustomer.visits}
            onChange={(e) => setNewCustomer({ ...newCustomer, visits: parseInt(e.target.value) })}
            required
          />
          <button type="submit">Add Customer</button>
        </form>
        <ul>
          {customers.map((customer) => (
            <li key={customer._id}>
              {customer.name} - {customer.email} - ${customer.totalSpending} - {customer.visits} visits
            </li>
          ))}
        </ul>
      </div>

      {/* Orders */}
      <div>
        <h2>Orders</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addOrder();
          }}
        >
          <input
            type="text"
            placeholder="Customer ID"
            value={newOrder.customerId}
            onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Order Amount"
            value={newOrder.orderAmount}
            onChange={(e) => setNewOrder({ ...newOrder, orderAmount: parseFloat(e.target.value) })}
            required
          />
          <input
            type="date"
            placeholder="Order Date"
            value={newOrder.orderDate}
            onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
            required
          />
          <button type="submit">Add Order</button>
        </form>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              {order.customerId} - ${order.orderAmount} - {order.orderDate}
            </li>
          ))}
        </ul>
      </div>

      {/* Campaigns */}
      <div>
        <h2>Campaigns</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCampaign();
          }}
        >
          <input
            type="text"
            placeholder="Campaign Name"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newCampaign.description}
            onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newCampaign.startDate}
            onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="End Date"
            value={newCampaign.endDate}
            onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
            required
          />
          <button type="submit">Add Campaign</button>
        </form>
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign._id}>
              {campaign.name} - {campaign.description} - {campaign.status} - {campaign.startDate} to {campaign.endDate}
            </li>
          ))}
        </ul>
      </div>

      {/* Audiences */}
      <div>
        <h2>Audiences</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addAudience();
          }}
        >
          <input
            type="text"
            placeholder="Audience Name"
            value={newAudience.name}
            onChange={(e) => setNewAudience({ ...newAudience, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Criteria"
            value={JSON.stringify(newAudience.criteria)}
            onChange={(e) =>
              setNewAudience({ ...newAudience, criteria: JSON.parse(e.target.value) })
            }
            required
          />
          <button type="submit">Add Audience</button>
        </form>
        <ul>
          {audiences.map((audience) => (
            <li key={audience._id}>
              {audience.name} - {JSON.stringify(audience.criteria)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
