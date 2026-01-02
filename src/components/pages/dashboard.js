import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";

const Dashboard = () => {
  const navigate = useNavigate();

  // Local state for Firestore results and UI meta
  const [listings, setListings] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Listen for auth changes so we can scope queries to the logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // If no user is logged in, clear state and stop loading
      if (!currentUser) {
        setListings([]);
        setAppointments([]);
        setLoading(false);
        return;
      }

      // Fetch data for the authenticated user
      setLoading(true);
      setError("");
      try {
        await fetchDashboardData(currentUser.uid);
      } catch (err) {
        setError(err?.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Fetch both listings and appointments for the given user ID
  const fetchDashboardData = async (uid) => {
    const [userListings, userAppointments] = await Promise.all([
      fetchUserListings(uid),
      fetchUserAppointments(uid),
    ]);
    setListings(userListings);
    setAppointments(userAppointments);
  };

  // Query Firestore for listings where userId matches the logged-in user
  const fetchUserListings = async (uid) => {
    const listingsRef = collection(db, "listings");
    const listingsQuery = query(listingsRef, where("userId", "==", uid));
    const snapshot = await getDocs(listingsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  // Query Firestore for appointments where userId matches the logged-in user
  const fetchUserAppointments = async (uid) => {
    const appointmentsRef = collection(db, "appointments");
    const appointmentsQuery = query(appointmentsRef, where("userId", "==", uid));
    const snapshot = await getDocs(appointmentsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const renderListings = () => {
    if (listings.length === 0) {
      return <p className="text-gray-500">No listings found.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="rounded-lg border border-gray-200 bg-[var(--surface-soft)] p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                <p className="text-sm text-gray-600">{listing.location}</p>
              </div>
              <span className="text-sm font-medium text-blue-800">{listing.status || "draft"}</span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{listing.description}</p>
            <p className="mt-3 text-base font-semibold text-gray-900">{listing.price}</p>
            {Array.isArray(listing.images) && listing.images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {listing.images.map((src, idx) => (
                  <img
                    key={`${listing.id}-img-${idx}`}
                    src={src}
                    alt={`${listing.title}-img-${idx}`}
                    className="h-20 w-28 rounded object-cover border border-gray-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderAppointments = () => {
    if (appointments.length === 0) {
      return <p className="text-gray-500">No appointments found.</p>;
    }

    return (
      <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-[var(--surface-soft)]">
        {appointments.map((appt) => (
          <div key={appt.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Listing: {appt.listingId}</p>
                <p className="text-sm text-gray-700">Date: {appt.date}</p>
              </div>
              <span className="text-xs font-medium uppercase text-blue-800">{appt.status || "pending"}</span>
            </div>
            {appt.notes && <p className="mt-2 text-sm text-gray-700">Notes: {appt.notes}</p>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600">Your listings and appointments</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
          >
            ← Back to Home
          </button>
        </div>

        {!user && !loading && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-800">
            Please sign in to view your dashboard data.
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-lg border border-gray-200 bg-[var(--surface-soft)] p-6 text-center text-gray-600">
            Loading your dashboard...
          </div>
        ) : (
          user && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">Listings</h2>
                {renderListings()}
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
                {renderAppointments()}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;

