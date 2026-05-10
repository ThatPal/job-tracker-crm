import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

// App.jsx is the main React component for our frontend.
// It combines the job list and job form into one page.

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Job Tracker CRM</h1>
        <p>Track customers, properties, and job progress.</p>
      </header>

      <main className="main-content">
        <section className="card">
          <h2>Jobs</h2>
          <JobList />
        </section>

        <section className="card">
          <h2>Add New Job</h2>
          <JobForm />
        </section>
      </main>
    </div>
  );
}

export default App;