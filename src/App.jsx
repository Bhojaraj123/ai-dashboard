import React, { useEffect, useState } from "react";

// Header component with welcome message
function Header({ userName }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
      <p className="mt-2 text-sm opacity-90">Here's your avatar dashboard</p>
    </header>
  );
}

// Avatar card component
function AvatarCard({ avatar }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        src={avatar.avatar}
        alt={`${avatar.first_name} ${avatar.last_name}`}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{`${avatar.first_name} ${avatar.last_name}`}</h3>
      <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition">
        Edit
      </button>
    </div>
  );
}

// Modal component
function CreateAvatarModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div
          className="bg-white rounded-lg p-6 w-80 max-w-full pointer-events-auto shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Create New Avatar</h2>
          <p className="mb-6">This is just a UI modal (no saving functionality)</p>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

// Floating button component
function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition"
      aria-label="Create New Avatar"
      title="Create New Avatar"
    >
      +
    </button>
  );
}

export default function App() {
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch 3 avatars from DummyJSON API
  useEffect(() => {
    async function fetchAvatars() {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=3");
        const data = await res.json();
        // Map DummyJSON user to our avatar format
        const avatars = data.users.map((user) => ({
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          avatar: user.image,
        }));
        setAvatars(avatars);
      } catch (error) {
        console.error("Failed to fetch avatars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAvatars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header userName="User" />

      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading avatars...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {avatars.map((avatar) => (
              <AvatarCard key={avatar.id} avatar={avatar} />
            ))}
          </div>
        )}
      </main>

      <FloatingButton onClick={() => setModalOpen(true)} />

      <CreateAvatarModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
