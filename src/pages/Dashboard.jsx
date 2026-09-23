import { useEffect, useState, useRef } from "react";
import { getClients, deactivateClient } from "../services/clientService";
import {
  sendInvite,
  getInvites,
  resendInvitation,
  revokeInvitation,
} from "../services/invitationService";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import LoadingScreen from "../components/LoadingScreen";
import emailjs from "@emailjs/browser";
import Toast from "../components/Toast";

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
  const [showToast, setShowToast] = useState(false);

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

  const handleSendInvite = async () => {
    const inviteData = await sendInvite(inviteEmail);

    console.log(inviteData);

    if (!inviteData) return;

    sendEmail(inviteEmail, inviteData.invite_link);

    setInviteEmail("");
    setShowInviteBox(false);
  };

  const handleRevokeInvite = async (inviteId) => {
    await revokeInvitation(inviteId);

    setInvites((prev) => prev.filter((invite) => invite.id !== inviteId));
  };

  const handleResendInvite = async (inviteId) => {
    const invite = await resendInvitation(inviteId);

    if (!invite.error) {
      setShowToast(true);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2500);

    sendEmail(invite.email, invite.invite_link);
  };

  const sendEmail = (email, inviteLink) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      email,
      invite_link: inviteLink,
    };

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
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
                Trainer Dashboard
              </p>

              <h1
                className="text-4xl font-bold tracking-[-0.04em] text-[#24163b] md:text-5xl"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Hello {firstName}
              </h1>

              <p className="mt-3 text-[17px] text-[#8d87a1]">
                Manage your clients and nutrition plans in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-xl">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>

                <p className="text-sm font-medium text-[#24163b]">
                  {clients.filter((client) => client.is_active).length} Active
                  Clients
                </p>
              </div>

              <button
                onClick={() => setShowSentInvitationBox(!showSentInvitationBox)}
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#9b6cff] to-[#7b4dff] px-5 py-3 text-white shadow-[0_10px_30px_rgba(123,77,255,0.25)] transition-all duration-150 duration-300 hover:-translate-y-[1px] hover:scale-[1.02] active:scale-95"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-white/80"></div>

                <p className="text-sm font-medium tracking-[0.2px]">
                  Sent Invitations
                </p>
              </button>
            </div>
          </div>

          {showSentInvitationBox && (
            <div className="mx-auto mt-6 w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/30 bg-white/55 shadow-[0_10px_35px_rgba(31,38,135,0.05)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/20 px-6 py-5">
                <div>
                  <h2
                    className="text-lg font-semibold text-[#24163b]"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    Sent Invitations
                  </h2>

                  <p className="mt-1 text-sm text-[#8d87a1]">
                    Pending client onboarding requests.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#f5efff] px-3 py-1 text-xs font-semibold text-[#8b5cf6]">
                    {invites.length}
                  </div>

                  <button
                    onClick={() => setShowInviteBox(!showInviteBox)}
                    className="rounded-full bg-[#24163b] px-4 py-2 text-xs font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-95"
                  >
                    + New Invite
                  </button>
                </div>
              </div>

              {showInviteBox && (
                <div className="border-b border-white/20 px-6 py-5">
                  <div className="flex items-center gap-3 rounded-2xl border border-[#efe8ff] bg-[#faf8ff] p-3">
                    <input
                      type="email"
                      placeholder="Client email..."
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 bg-transparent px-3 text-[15px] text-[#24163b] outline-none placeholder:text-[#9b95ad]"
                    />

                    <button
                      onClick={handleSendInvite}
                      className="rounded-xl bg-[#24163b] px-5 py-2.5 text-sm font-medium text-white transition-all duration-150 hover:opacity-90 active:scale-95"
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
                    className="flex items-center justify-between px-6 py-4 transition-all hover:bg-white/30"
                  >
                    <div>
                      <p className="text-[15px] font-medium text-[#24163b]">
                        {invite.email}
                      </p>

                      <p className="mt-1 text-xs text-[#9b95ad]">
                        Waiting for registration
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleResendInvite(invite.id)}
                        className="cursor-pointer text-sm font-medium text-[#7b4dff] transition-all duration-150 hover:text-[#6231db] active:scale-95"
                      >
                        Resend
                      </button>

                      <button
                        onClick={() => handleRevokeInvite(invite.id)}
                        className="cursor-pointer text-sm font-medium text-[#d14b72] transition-all duration-150 hover:text-[#b91c5c] active:scale-95"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-14 flex justify-center">
            <div className="relative w-full max-w-3xl" ref={dropdownRef}>
              <input
                className="mt-8 mb-1 w-full rounded-[30px] border border-white/40 bg-white/70 px-7 py-5 text-[#24163b] shadow-sm backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
                placeholder="Search client..."
                value={clientSearch}
                onFocus={() => setOpenDropdown(true)}
                onChange={(e) => setClientSearch(e.target.value)}
              />

              {openDropdown && (
                <div className="absolute top-full left-0 z-50 mt-3 max-h-80 w-full overflow-hidden overflow-y-auto rounded-[30px] border border-white/30 bg-white/80 shadow-2xl backdrop-blur-xl">
                  {filteredClients.map((client) => (
                    <div
                      className="flex cursor-pointer items-center gap-4 px-6 py-5 transition-all hover:bg-[#f6f1ff]"
                      key={client.id}
                      onClick={() => {
                        setClientSearch(
                          `${client.first_name} ${client.last_name}`,
                        );
                        setOpenDropdown(false);
                        navigate(`/client/${client.id}`);
                      }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] font-semibold text-white shadow-md">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clients
              .filter((client) => client.is_active)
              .map((client) => (
                <div
                  key={client.id}
                  className="group rounded-3xl border border-white/40 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="mx-auto flex h-24 w-24 cursor-pointer items-center justify-center rounded-3xl bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] text-3xl font-bold text-white shadow-lg transition-all group-hover:scale-105"
                    onClick={() => navigate(`/client/${client.id}`)}
                  >
                    {client.first_name[0]}
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="text-lg font-semibold text-[#24163b]">
                      {client.first_name} {client.last_name}
                    </h3>

                    <p className="mt-1 text-sm text-[#8d87a1]">Active client</p>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      className="flex-1 rounded-2xl bg-[#f7f3ff] py-3 text-sm font-medium text-[#8b5cf6] transition-all duration-150 hover:bg-[#ede4ff] active:scale-95"
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
                      className="rounded-2xl bg-[#fff8e8] px-4 py-3 text-sm font-medium text-[#d97706] transition-all duration-150 hover:bg-[#fef3c7] active:scale-95"
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
              className="flex items-center gap-3 text-[#8d87a1] transition-all duration-150 hover:text-[#24163b] active:scale-95"
            >
              <div
                className={`transition-transform duration-300 ${showInactiveClients ? "rotate-90" : ""}`}
              >
                ▶
              </div>

              <p className="text-sm font-medium tracking-[0.18em] uppercase">
                Inactive Clients
              </p>

              <div className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#6b7280]">
                {clients.filter((client) => !client.is_active).length}
              </div>
            </button>

            {showInactiveClients && (
              <div className="animate-in fade-in mt-6 grid grid-cols-1 gap-5 duration-300 sm:grid-cols-2 lg:grid-cols-3 ">
                {clients
                  .filter((client) => !client.is_active)
                  .map((client) => (
                    <div
                      key={client.id}
                      className="group rounded-[28px] border border-white/20 bg-white/40 p-5 opacity-75 backdrop-blur-xl transition-all hover:opacity-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#e5e7eb] text-lg font-bold text-[#6b7280]">
                          {client.first_name?.[0]}
                        </div>

                        <div>
                          <p className="text-lg font-semibold text-[#4b5563]">
                            {client.first_name} {client.last_name}
                          </p>

                          <p className="mt-1 text-sm text-[#9ca3af]">
                            {client.email}
                          </p>
                        </div>
                      </div>

                      <button className="mt-5 w-full rounded-2xl bg-[#ecfdf5] py-3 text-sm font-medium text-[#059669] transition-all duration-150 hover:bg-[#d1fae5] active:scale-95">
                        Restore
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-20 flex justify-center">
            <div className="w-full max-w-2xl rounded-3xl border border-white/40 bg-white/70 p-8 text-center shadow-sm backdrop-blur-xl">
              <h2
                className="text-2xl font-semibold text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Invite New Client
              </h2>

              <p className="mt-3 mb-6 text-[#8d87a1]">
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
                  <div className="animate-in fade-in slide-in-from-top-2 mt-8 w-full rounded-3xl border border-white/40 bg-white/60 p-5 shadow-[0_10px_40px_rgba(31,38,135,0.08)] backdrop-blur-xl duration-300">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                      <input
                        type="email"
                        placeholder="Client email..."
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full flex-1 rounded-2xl border border-white/40 bg-white/80 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
                      />

                      <Button
                        onClick={handleSendInvite}
                        className="w-full whitespace-nowrap md:w-auto"
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
        <Toast
          show={showToast}
          title="Invitation Sent"
          message="A new invitation email has been successfully sent to your client."
        />
      </Layout>
    </>
  );
}

export default Dashboard;
