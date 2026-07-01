import { apiGet, type Supplier } from "@/lib/api";

export default async function SuppliersPage() {
  const suppliers = await apiGet<Supplier[]>("/api/suppliers");
  return (
    <>
      <header className="pageHeader">
        <div>
          <span className="eyebrow">Supplier management</span>
          <h1>Order with shelf life and lead time in mind.</h1>
          <p>Minimum order quantity and reliability influence whether the optimization agent recommends reorder, transfer, or markdown first.</p>
        </div>
      </header>
      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Category</th>
            <th>Lead time</th>
            <th>Reliability</th>
            <th>Minimum order</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.name}>
              <td><strong>{supplier.name}</strong></td>
              <td>{supplier.category}</td>
              <td>{supplier.lead_time_days} days</td>
              <td>{Math.round(supplier.reliability_score * 100)}%</td>
              <td>{supplier.minimum_order_units} units</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
