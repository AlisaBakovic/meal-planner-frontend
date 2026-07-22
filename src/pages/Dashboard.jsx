import { useEffect, useState, useRef } from "react";
import { getClients, deactivateClient } from "../services/clientService";
import {
  sendInvite,
  getInvites,
  revokeInvite,
} from "../services/invitationService";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import LoadingScreen from "../components/LoadingScreen";
import emailjs from "@emailjs/browser";

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clientSearch, setClientSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const [showInviteBox, setShowInviteBox] = useState(false);
  const [showSentInvitationBox, setShowSentInvitationBox] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invites, setInvites] = useState([]);
  const [showInactiveClients, setShowInactiveClients] = useState(false);

  const dropdownRef = useRef(null);

  const loadData = async () => {
    setLoading(true);

    try {
      const clientsData = await getClients();
      if (!clientsData) return;

      const getInvitations = await getInvites();
      if (!getInvitations) return;

      setClients(clientsData);
      setInvites(getInvitations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const firstName = localStorage.getItem("first_name");

  useEffect(() => {
    loadData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const handleSendInvite = async (email) => {
    const inviteData = await sendInvite(inviteEmail);
    const inviteLink = `http://localhost:5173/invite/${inviteData.token}`;

    if (!inviteData) return;

    sendEmail(inviteEmail);

    setInviteEmail("");
    setShowInviteBox(false);
    console.log(inviteLink);
  };

  const handleRevokeInvite = async (inviteId) => {
    await revokeInvite(inviteId);

    setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  const sendEmail = (email) => {
    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_duvq7f2";
    const templateId = "template_k73go98";
    const publicKey = "-aHVMcujC0K2PXodk";

    // Create a new object that contains dynamic template params
    const templateParams = {
      email: email,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const filteredClients = clients.filter((client) =>
    `${client.first_name} ${client.last_name}`
      .toLowerCase()
      .includes(clientSearch.toLowerCase()),
  );

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <>
      <Layout>
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] mb-4">
                Trainer Dashboard
              </p>

              <h1
                className="text-4xl md:text-5xl font-bold tracking-[-0.04em] text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Hello {firstName}
              </h1>

              <p className="text-[#8d87a1] mt-3 text-[17px]">
                Manage your clients and nutrition plans in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-3 shadow-sm">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>

                <p className="text-sm text-[#24163b] font-medium">
                  {clients.filter((client) => client.is_active).length} Active
                  Clients
                </p>
              </div>

              <button
                onClick={() => setShowSentInvitationBox(!showSentInvitationBox)}
                className="group flex items-center gap-3 bg-gradient-to-r from-[#9b6cff] to-[#7b4dff] text-white rounded-2xl px-5 py-3 shadow-[0_10px_30px_rgba(123,77,255,0.25)] hover:scale-[1.02] hover:-translate-y-[1px] transition-all duration-300"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white/80"></div>

                <p className="text-sm font-medium tracking-[0.2px]">
                  Sent Invitations
                </p>
              </button>
            </div>
          </div>

          {showSentInvitationBox && (
            <div className="mt-6 w-full max-w-2xl mx-auto rounded-[28px] border border-white/30 bg-white/55 backdrop-blur-xl overflow-hidden shadow-[0_10px_35px_rgba(31,38,135,0.05)]">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/20">
                <div>
                  <h2
                    className="text-lg font-semibold text-[#24163b]"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    Sent Invitations
                  </h2>

                  <p className="text-sm text-[#8d87a1] mt-1">
                    Pending client onboarding requests.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full bg-[#f5efff] text-[#8b5cf6] text-xs font-semibold">
                    {invites.length}
                  </div>

                  <button
                    onClick={() => setShowInviteBox(!showInviteBox)}
                    className="rounded-full bg-[#24163b] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-all"
                  >
                    + New Invite
                  </button>
                </div>
              </div>

              {showInviteBox && (
                <div className="px-6 py-5 border-b border-white/20">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#faf8ff] border border-[#efe8ff] p-3">
                    <input
                      type="email"
                      placeholder="Client email..."
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 bg-transparent px-3 text-[15px] text-[#24163b] placeholder:text-[#9b95ad] outline-none"
                    />

                    <button
                      onClick={handleSendInvite}
                      className="rounded-xl bg-[#24163b] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}

              <div className="divide-y divide-white/20">
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/30 transition-all"
                  >
                    <div>
                      <p className="text-[15px] font-medium text-[#24163b]">
                        {invite.email}
                      </p>

                      <p className="text-xs text-[#9b95ad] mt-1">
                        Waiting for registration
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="text-sm font-medium text-[#7b4dff] hover:text-[#6231db] transition-all">
                        Resend
                      </button>

                      <button
                        onClick={() => handleRevokeInvite(invite.id)}
                        className="cursor-pointer text-sm font-medium text-[#d14b72] hover:text-[#b91c5c] transition-all"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center mb-14">
            <div className="relative w-full max-w-3xl" ref={dropdownRef}>
              <input
                className="mt-8 mb-1 w-full rounded-[30px] border border-white/40 bg-white/70 backdrop-blur-xl px-7 py-5 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 shadow-sm transition-all"
                placeholder="Search client..."
                value={clientSearch}
                onFocus={() => setOpenDropdown(true)}
                onChange={(e) => setClientSearch(e.target.value)}
              />

              {openDropdown && (
                <div className="absolute top-full left-0 w-full mt-3 rounded-[30px] border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto z-50">
                  {filteredClients.map((client) => (
                    <div
                      className="px-6 py-5 hover:bg-[#f6f1ff] cursor-pointer transition-all flex items-center gap-4"
                      key={client.id}
                      onClick={() => {
                        setClientSearch(
                          `${client.first_name} ${client.last_name}`,
                        );
                        setOpenDropdown(false);
                        navigate(`/client/${client.id}`);
                      }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] flex items-center justify-center text-white font-semibold shadow-md">
                        {client.first_name[0]}
                      </div>

                      <div>
                        <p className="font-medium text-[#24163b]">
                          {client.first_name} {client.last_name}
                        </p>

                        <p className="text-sm text-[#8d87a1]">View details</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-2xl font-semibold text-[#24163b]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Active Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients
              .filter((client) => client.is_active)
              .map((client) => (
                <div
                  key={client.id}
                  className="group bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto cursor-pointer group-hover:scale-105 transition-all"
                    onClick={() => navigate(`/client/${client.id}`)}
                  >
                    {client.first_name[0]}
                  </div>

                  <div className="text-center mt-5">
                    <h3 className="font-semibold text-lg text-[#24163b]">
                      {client.first_name} {client.last_name}
                    </h3>

                    <p className="text-sm text-[#8d87a1] mt-1">Active client</p>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      className="flex-1 rounded-2xl bg-[#f7f3ff] py-3 text-sm font-medium text-[#8b5cf6] hover:bg-[#ede4ff] transition-all"
                      onClick={() => navigate(`/client/${client.id}`)}
                    >
                      View details
                    </button>

                    <button
                      onClick={async () => {
                        await deactivateClient(client.id);
                        const data = await deactivateClient(client.id);

                        console.log(data);
                        await loadData();
                      }}
                      className="rounded-2xl bg-[#fff8e8] px-4 py-3 text-sm font-medium text-[#d97706] hover:bg-[#fef3c7] transition-all"
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-16">
            <button
              onClick={() => setShowInactiveClients(!showInactiveClients)}
              className="flex items-center gap-3 text-[#8d87a1] hover:text-[#24163b] transition-all"
            >
              <div
                className={`transition-transform duration-300 ${showInactiveClients ? "rotate-90" : ""}`}
              >
                ▶
              </div>

              <p className="text-sm uppercase tracking-[0.18em] font-medium">
                Inactive Clients
              </p>

              <div className="px-3 py-1 rounded-full bg-[#f3f4f6] text-[#6b7280] text-xs font-semibold">
                {clients.filter((client) => !client.is_active).length}
              </div>
            </button>

            {showInactiveClients && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-300">
                {clients
                  .filter((client) => !client.is_active)
                  .map((client) => (
                    <div
                      key={client.id}
                      className="group bg-white/40 backdrop-blur-xl border border-white/20 rounded-[28px] p-5 opacity-75 hover:opacity-100 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-[20px] bg-[#e5e7eb] flex items-center justify-center text-[#6b7280] text-lg font-bold">
                          {client.first_name?.[0]}
                        </div>

                        <div>
                          <p className="text-lg font-semibold text-[#4b5563]">
                            {client.first_name} {client.last_name}
                          </p>

                          <p className="text-sm text-[#9ca3af] mt-1">
                            {client.email}
                          </p>
                        </div>
                      </div>

                      <button className="w-full mt-5 rounded-2xl bg-[#ecfdf5] py-3 text-[#059669] text-sm font-medium hover:bg-[#d1fae5] transition-all">
                        Restore
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-20 flex justify-center">
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-sm w-full max-w-2xl text-center">
              <h2
                className="text-2xl font-semibold text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Invite New Client
              </h2>

              <p className="text-[#8d87a1] mt-3 mb-6">
                Send an invitation link so your client can create their account
                and join your coaching dashboard.
              </p>

              <div className="flex flex-col items-center">
                {!showInviteBox && (
                  <Button
                    className="flex justify-center"
                    onClick={() => setShowInviteBox(!showInviteBox)}
                  >
                    Send Invitation Link
                  </Button>
                )}

                {showInviteBox && (
                  <div className="w-full mt-8 rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-[0_10px_40px_rgba(31,38,135,0.08)] animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <input
                        type="email"
                        placeholder="Client email..."
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1 w-full rounded-2xl border border-white/40 bg-white/80 backdrop-blur-xl px-5 py-4 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 transition-all"
                      />

                      <Button
                        onClick={handleSendInvite}
                        className="w-full md:w-auto whitespace-nowrap"
                      >
                        Send Invite
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
