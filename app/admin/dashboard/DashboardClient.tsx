"use client";

import { useState } from "react";
import { UserSession } from "@/lib/auth";
import {
  logoutAction,
  updateWebConfigAction,
  saveCarAction,
  deleteCarAction,
  saveTestimonialAction,
  deleteTestimonialAction,
} from "@/app/actions/admin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trash,
  Pencil,
  Plus,
  SignOut,
  Car,
  Chat,
  Gear,
  Star,
  UploadSimple,
  ArrowClockwise,
  Palette,
  CheckCircle,
} from "@phosphor-icons/react";
import { THEMES, ThemeKey } from "@/lib/themes";

interface CarType {
  id: number;
  name: string;
  price: string;
  qty: number;
  pricePer: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TestimonialType {
  id: number;
  name: string;
  stars: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WebConfigType {
  id: number;
  address: string | null;
  phone: string | null;
  tiktokAccount: string | null;
  instagramAccount: string | null;
  mapPinPoint: string | null;
  theme: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  session: UserSession;
  initialCars: CarType[];
  initialTestimonials: TestimonialType[];
  initialConfig: WebConfigType | null;
}

export default function DashboardClient({
  session,
  initialCars,
  initialTestimonials,
  initialConfig,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "cars" | "testimonials" | "config"
  >("cars");

  // Local States
  const [cars, setCars] = useState<CarType[]>(initialCars);
  const [testimonials, setTestimonials] =
    useState<TestimonialType[]>(initialTestimonials);
  const [config, setConfig] = useState<WebConfigType | null>(initialConfig);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(
    (initialConfig?.theme as ThemeKey) || "navy_gold"
  );

  // Loading & Modals
  const [submitting, setSubmitting] = useState(false);
  const [carModal, setCarModal] = useState<{
    open: boolean;
    car: CarType | null;
  }>({ open: false, car: null });
  const [testimonialModal, setTestimonialModal] = useState<{
    open: boolean;
    testimonial: TestimonialType | null;
  }>({ open: false, testimonial: null });

  // Upload Previews
  const [carImagePreview, setCarImagePreview] = useState<string | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function notify(type: "success" | "error", message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }

  // Auth
  async function handleLogout() {
    await logoutAction();
  }

  // Web Config Submit
  async function handleConfigSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const res = await updateWebConfigAction(formData);
    setSubmitting(false);

    if (res.error) {
      notify("error", res.error);
    } else {
      notify("success", "Konfigurasi website berhasil disimpan!");
      router.refresh();
    }
  }

  // Car Submit
  async function handleCarSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (carModal.car) {
      formData.append("id", carModal.car.id.toString());
      formData.append("imageUrl", carModal.car.image);
    }

    const res = await saveCarAction(formData);
    setSubmitting(false);

    if (res.error) {
      notify("error", res.error);
    } else {
      notify(
        "success",
        `Mobil berhasil ${carModal.car ? "diperbarui" : "ditambahkan"}!`,
      );
      setCarModal({ open: false, car: null });
      setCarImagePreview(null);
      // Fetch fresh data
      router.refresh();
      // Fast state reload
      setTimeout(() => window.location.reload(), 100);
    }
  }

  // Car Delete
  async function handleCarDelete(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus mobil ini?")) return;

    const res = await deleteCarAction(id);
    if (res.error) {
      notify("error", res.error);
    } else {
      notify("success", "Mobil berhasil dihapus!");
      setCars(cars.filter((c) => c.id !== id));
      router.refresh();
    }
  }

  // Testimonial Submit
  async function handleTestimonialSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (testimonialModal.testimonial) {
      formData.append("id", testimonialModal.testimonial.id.toString());
    }

    const res = await saveTestimonialAction(formData);
    setSubmitting(false);

    if (res.error) {
      notify("error", res.error);
    } else {
      notify(
        "success",
        `Testimoni berhasil ${testimonialModal.testimonial ? "diperbarui" : "ditambahkan"}!`,
      );
      setTestimonialModal({ open: false, testimonial: null });
      router.refresh();
      setTimeout(() => window.location.reload(), 100);
    }
  }

  // Testimonial Delete
  async function handleTestimonialDelete(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;

    const res = await deleteTestimonialAction(id);
    if (res.error) {
      notify("error", res.error);
    } else {
      notify("success", "Testimoni berhasil dihapus!");
      setTestimonials(testimonials.filter((t) => t.id !== id));
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header bar */}
      <header className="bg-[#1a2b5e] text-white py-4 px-6 sm:px-8 shadow-md flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-white.svg"
            alt="Logo"
            width={90}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <span className="h-6 w-px bg-white/20 hidden sm:inline" />
          <h1 className="text-lg font-black uppercase tracking-wider italic hidden sm:block">
            Dashboard Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-white">{session.name}</p>
            <p className="text-xs text-white/60">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
            title="Keluar"
          >
            <SignOut className="w-5 h-5" weight="bold" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8">
        {/* Toast Notification */}
        {notification && (
          <div
            className={`fixed bottom-5 right-5 z-50 px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300 transform translate-y-0 ${
              notification.type === "success"
                ? "bg-emerald-500 border-emerald-600 text-white"
                : "bg-red-500 border-red-600 text-white"
            }`}
          >
            <p className="font-bold text-sm">{notification.message}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-none gap-2">
          <button
            onClick={() => setActiveTab("cars")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-black text-sm uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "cars"
                ? "border-[#1B69F4] text-[#1B69F4]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Car className="w-5 h-5" weight="bold" />
            Armada Mobil
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-black text-sm uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "testimonials"
                ? "border-[#1B69F4] text-[#1B69F4]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Chat className="w-5 h-5" weight="bold" />
            Testimoni
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-black text-sm uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "config"
                ? "border-[#1B69F4] text-[#1B69F4]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <Gear className="w-5 h-5" weight="bold" />
            Konfigurasi Web
          </button>
        </div>

        {/* TABS CONTENT */}

        {/* Tab 1: Cars CRUD */}
        {activeTab === "cars" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#1a2b5e] uppercase tracking-wide">
                  Daftar Armada
                </h2>
                <p className="text-gray-500 text-sm">
                  Kelola unit mobil sewa Anda
                </p>
              </div>
              <button
                onClick={() => {
                  setCarImagePreview(null);
                  setCarModal({ open: true, car: null });
                }}
                className="bg-[#1B69F4] hover:bg-[#1e2d6e] text-white font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" weight="bold" />
                Tambah Mobil
              </button>
            </div>

            {cars.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center text-gray-400">
                <Car
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  weight="light"
                />
                <p className="text-lg font-bold">Belum ada mobil</p>
                <p className="text-sm">
                  Klik tombol "Tambah Mobil" di atas untuk menambahkan armada.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center p-4">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {car.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          Jumlah Unit:{" "}
                          <span className="font-bold text-gray-900">
                            {car.qty}
                          </span>
                        </p>
                        <div className="bg-blue-50/50 rounded-xl px-4 py-2 text-sm text-[#1B69F4] font-black inline-block">
                          Rp {car.price}{" "}
                          <span className="font-normal text-xs text-gray-500">
                            / {car.pricePer}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t border-gray-100 pt-4 mt-6">
                        <button
                          onClick={() => {
                            setCarImagePreview(car.image);
                            setCarModal({ open: true, car });
                          }}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleCarDelete(car.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider p-2.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                          title="Hapus Mobil"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Testimonials CRUD */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#1a2b5e] uppercase tracking-wide">
                  Daftar Testimoni
                </h2>
                <p className="text-gray-500 text-sm">
                  Kelola ulasan kepuasan pelanggan
                </p>
              </div>
              <button
                onClick={() =>
                  setTestimonialModal({ open: true, testimonial: null })
                }
                className="bg-[#1B69F4] hover:bg-[#1e2d6e] text-white font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" weight="bold" />
                Tambah Testimoni
              </button>
            </div>

            {testimonials.length === 0 ? (
              <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center text-gray-400">
                <Chat
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  weight="light"
                />
                <p className="text-lg font-bold">Belum ada testimoni</p>
                <p className="text-sm">
                  Klik tombol "Tambah Testimoni" di atas untuk menambahkan
                  ulasan baru.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-950 text-base">
                          {testimonial.name}
                        </h3>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < testimonial.stars ? "text-amber-400" : "text-gray-200"}`}
                              weight="fill"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        "{testimonial.comment}"
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-gray-50 pt-4 mt-6">
                      <button
                        onClick={() =>
                          setTestimonialModal({ open: true, testimonial })
                        }
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleTestimonialDelete(testimonial.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider p-2.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Web Config */}
        {activeTab === "config" && (
          <div className="space-y-8 max-w-3xl">
            {/* Theme Picker Section */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-6 h-6 text-[#1B69F4]" weight="fill" />
                <h2 className="text-2xl font-black text-[#1a2b5e] uppercase tracking-wide">
                  Tema Website
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-8">
                Pilih tampilan visual website yang sesuai dengan karakter bisnis Anda. Perubahan akan langsung terlihat setelah disimpan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Object.values(THEMES) as (typeof THEMES)[ThemeKey][]).map((theme) => {
                  const isActive = selectedTheme === theme.key;
                  return (
                    <button
                      key={theme.key}
                      type="button"
                      onClick={() => setSelectedTheme(theme.key)}
                      className={`relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? "border-[#1B69F4] shadow-lg shadow-blue-100 scale-[1.02]"
                          : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      {/* Color swatch preview */}
                      <div
                        className="h-20 w-full relative flex items-end p-3"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.heroFrom}, ${theme.colors.heroTo})`,
                        }}
                      >
                        {/* Accent dot strip */}
                        <div className="flex gap-1.5">
                          <div
                            className="h-3 w-3 rounded-full border border-white/40"
                            style={{ background: theme.colors.accent }}
                          />
                          <div
                            className="h-3 w-10 rounded-full opacity-60"
                            style={{ background: theme.colors.heroText }}
                          />
                          <div
                            className="h-3 w-6 rounded-full opacity-30"
                            style={{ background: theme.colors.heroText }}
                          />
                        </div>

                        {/* Checkmark for active */}
                        {isActive && (
                          <div className="absolute top-2.5 right-2.5">
                            <CheckCircle
                              className="w-6 h-6 text-white drop-shadow"
                              weight="fill"
                            />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3 bg-white">
                        <p className="font-black text-gray-900 text-sm">{theme.name}</p>
                        <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5 line-clamp-2">
                          {theme.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact & Info Config */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Gear className="w-6 h-6 text-[#1B69F4]" weight="fill" />
                <h2 className="text-2xl font-black text-[#1a2b5e] uppercase tracking-wide">
                  Konfigurasi Website
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-8">
                Informasi kontak, sosial media, dan alamat yang akan ditampilkan di website.
              </p>

              <form onSubmit={handleConfigSubmit} className="space-y-6">
                {config?.id && (
                  <input type="hidden" name="id" value={config.id} />
                )}
                {/* Hidden input carries selectedTheme value */}
                <input type="hidden" name="theme" value={selectedTheme} />

                <div>
                  <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                    Nomor WhatsApp (Phone)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    defaultValue={config?.phone || ""}
                    placeholder="Format: 6281234567890 (Tanpa tanda +)"
                    className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-3 outline-none text-gray-900 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                    Alamat Kantor
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    defaultValue={config?.address || ""}
                    placeholder="Masukkan alamat lengkap kantor rental mobil"
                    className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-3 outline-none text-gray-900 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                      Akun Instagram
                    </label>
                    <input
                      type="text"
                      name="instagramAccount"
                      defaultValue={config?.instagramAccount || ""}
                      placeholder="Contoh: @adhitama89"
                      className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-3 outline-none text-gray-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                      Akun TikTok
                    </label>
                    <input
                      type="text"
                      name="tiktokAccount"
                      defaultValue={config?.tiktokAccount || ""}
                      placeholder="Contoh: @adhitama89"
                      className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-3 outline-none text-gray-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                    Google Maps Embed URL
                  </label>
                  <textarea
                    name="mapPinPoint"
                    rows={4}
                    defaultValue={config?.mapPinPoint || ""}
                    placeholder="Salin iframe src dari Google Maps share menu (contoh: https://www.google.com/maps/embed?...)"
                    className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-3 outline-none text-gray-900 transition-all text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#1B69F4] hover:bg-[#1e2d6e] disabled:bg-gray-400 text-white font-black text-sm uppercase tracking-widest px-8 py-3.5 rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {submitting && (
                    <ArrowClockwise className="animate-spin w-4 h-4" />
                  )}
                  {submitting ? "Menyimpan..." : "Simpan Konfigurasi & Tema"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* CAR MODAL */}
      {carModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-[#1a2b5e] uppercase tracking-wide mb-6">
              {carModal.car ? "Edit Armada Mobil" : "Tambah Armada Baru"}
            </h3>

            <form onSubmit={handleCarSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                  Nama Mobil
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={carModal.car?.name || ""}
                  placeholder="Contoh: Toyota Innova Zenix"
                  className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                    Harga / Tarif Sewa
                  </label>
                  <input
                    type="text"
                    name="price"
                    required
                    defaultValue={carModal.car?.price || ""}
                    placeholder="Contoh: 250000 - 375000 atau 700.000"
                    className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                    Per (Rent Period)
                  </label>
                  <select
                    name="pricePer"
                    defaultValue={carModal.car?.pricePer || "day"}
                    className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all bg-white"
                  >
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                  Jumlah Unit Tersedia (Qty)
                </label>
                <input
                  type="number"
                  name="qty"
                  required
                  min={1}
                  defaultValue={carModal.car?.qty || 1}
                  placeholder="Masukkan jumlah unit"
                  className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                  Gambar Mobil
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50/50">
                  {carImagePreview ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <Image
                        src={carImagePreview}
                        alt="Preview"
                        width={200}
                        height={100}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-400">
                      <UploadSimple className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                      <p className="text-xs font-bold uppercase tracking-wide">
                        Pilih File Gambar
                      </p>
                      <p className="text-[10px]">PNG, JPG, WEBP maks. 4MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    required={!carModal.car}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCarImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#1B69F4] hover:bg-[#1e2d6e] disabled:bg-gray-400 text-white font-black text-sm uppercase tracking-widest py-3 rounded-xl transition-colors cursor-pointer text-center"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCarModal({ open: false, car: null });
                    setCarImagePreview(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL MODAL */}
      {testimonialModal.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-[#1a2b5e] uppercase tracking-wide mb-6">
              {testimonialModal.testimonial
                ? "Edit Ulasan Testimoni"
                : "Tambah Testimoni Baru"}
            </h3>

            <form onSubmit={handleTestimonialSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                  Nama Pelanggan
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={testimonialModal.testimonial?.name || ""}
                  placeholder="Contoh: Andi Wijaya"
                  className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                  Jumlah Bintang
                </label>
                <select
                  name="stars"
                  defaultValue={testimonialModal.testimonial?.stars || 5}
                  className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all bg-white"
                >
                  <option value={5}>5 Bintang (Sempurna)</option>
                  <option value={4}>4 Bintang (Sangat Baik)</option>
                  <option value={3}>3 Bintang (Cukup)</option>
                  <option value={2}>2 Bintang (Kurang)</option>
                  <option value={1}>1 Bintang (Buruk)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider mb-2">
                  Komentar / Ulasan
                </label>
                <textarea
                  name="comment"
                  required
                  rows={4}
                  defaultValue={testimonialModal.testimonial?.comment || ""}
                  placeholder="Masukkan ulasan atau ulasan lengkap pelanggan..."
                  className="w-full border border-gray-200 focus:border-[#1B69F4] focus:ring-1 focus:ring-[#1B69F4] rounded-xl px-4 py-2.5 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#1B69F4] hover:bg-[#1e2d6e] disabled:bg-gray-400 text-white font-black text-sm uppercase tracking-widest py-3 rounded-xl transition-colors cursor-pointer text-center"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestimonialModal({ open: false, testimonial: null })
                  }
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
