'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from '../../styles/Page.module.css'
import AddLinksModal from '../../components/modal/AddLinksModal'
import AddBannersModal from '../../components/modal/AddBanerModal'
import EditLinkModal from '../../components/modal/EditLinkModal'
import EditCategoryModal from '../../components/modal/EditCategoryModal'
import EditBannerModal from '../../components/modal/EditBannerModal'
import CustomizeUrl from '../../components/modal/CustomizeUrl'
import Swal from 'sweetalert2';

import { fetchCategories, addCategory, editCategory, deleteCategory } from "../../../api/category/Category";
import { getProfile, updateProfile } from "../../../api/profile/Profile";
import { getLinks, addLink, updateLink, updateLinkStatus, deleteLink } from '../../../api/links/Links';

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState('fenttyy');
  const baseUrl = 'https://bara-link-aggregation/';

  const navigateToPage = (path) => {
    window.open(path, '_blank');
  };


  // =========================================================== PROFILE =========================================================== //
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    bio: "",
    phone: "",
    province: "",
    city: "",
    subdistrict: "",
    avatar: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data && data.status) {
        setProfile(data.profile[0]);
        if (data.profile[0].avatar) {
          setPreviewAvatar(data.profile[0].avatar);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value === "" ? null : value,  // Kirim null jika kosong
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleDeleteAvatar = () => {
    setSelectedFile(null);
    setPreviewAvatar(""); // Revert to default avatar
    setProfile((prevProfile) => ({
      ...prevProfile,
      avatar: null, // Indikasikan bahwa avatar dihapus
    }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!profile.username || !profile.phone) {
      Swal.fire("Error", "Username and phone is required", "error");
      return;
    }
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      if (key !== "avatar") {
        formData.append(key, profile[key] || "");  // Pastikan field kosong tetap dikirim
      }
    });
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    } else if (profile.avatar === null) {
      formData.append("delete_avatar", "true"); // Kirim sinyal untuk hapus avatar
    }
    await updateProfile(profile.id, formData);
  };
  // =========================================================== PROFILE =========================================================== //


  // =========================================================== CATEGORY =========================================================== //
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState({ id: null, category_name: "" });

  useEffect(() => {
    fetchCategories(setCategories, setLoading, setError);
  }, []);

  const refreshCategories = () => fetchCategories(setCategories, setLoading, setError);

  const handleAddCategory = (e) => {
    e.preventDefault();
    addCategory(newCategoryName, () => fetchCategories(setCategories, setLoading, setError));
    setNewCategoryName("");
  };

  const handleEditCategory = (formData) => {
    editCategory(formData, () => fetchCategories(setCategories, setLoading, setError), closeEditCategory);
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id, () => fetchCategories(setCategories, setLoading, setError));
  };

  const openEditCategory = (category) => {
    setEditCategoryData({ id: category.id, category_name: category.category_name });
    setIsEditCategoryOpen(true);
  };

  const closeEditCategory = () => {
    setIsEditCategoryOpen(false);
    setEditCategoryData({ id: null, category_name: "" });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // =========================================================== CATEGORY =========================================================== //


  // =========================================================== SWIPE EDITOR SECTION =========================================================== //
  const [isExpanded, setIsExpanded] = useState(false);
  const editorRef = useRef(null);
  const dragStartRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Handle Touch Events
  const handleTouchStart = (e) => {
    dragStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!dragStartRef.current) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartRef.current;

    if (diff < -50 && !isExpanded) {
      setIsExpanded(true);
    } else if (diff > 50 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleTouchEnd = () => {
    dragStartRef.current = null;
  };

  // Handle Mouse Events
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentY = e.clientY;
    const diff = currentY - dragStartRef.current;

    if (diff < -50 && !isExpanded) {
      setIsExpanded(true);
    } else if (diff > 50 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    dragStartRef.current = null;
  };

  // Handle Click untuk dragHandle
  const handleDragHandleClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Tambahkan event listeners ke komponen
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isExpanded]);
  // =========================================================== SWIPE EDITOR SECTION =========================================================== //


  // =========================================================== AFFILIATE URL MODAL =========================================================== //
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customize, setCustomize] = useState([]);

  const [customizeData, setCustomizeData] = useState({
    affiliate_url: 'https://baralynk.id/fenttyy'
  })

  const openCustomize = () => {
    setIsCustomizeOpen(true);
  };

  const closeCustomize = () => {
    setIsCustomizeOpen(false);
  };
  // =========================================================== AFFILIATE URL MODAL =========================================================== //


  // =========================================================== BANNER SLIDER =========================================================== //
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample banner data - replace with your actual banner data
  const banners = [
    { id: 1, image: "/images/avatar-fix.jpg", alt: "Banner 1" },
    { id: 2, image: "/images/banner-bg-fix.jpg", alt: "Banner 2" },
    // Add more banners as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };
  // =========================================================== BANNER SLIDER =========================================================== //


  // =========================================================== DELETE ALERT =========================================================== //
  const deleteBanner = () => {
    Swal.fire({
      title: 'Are you sure want to delete this Banner?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lakukan penghapusan
        // console.log(`Item with id ${id} deleted`);
        // Tambahkan logika API untuk menghapus item di sini

        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      }
    });
  };
  // =========================================================== DELETE ALERT =========================================================== //


  // =========================================================== LINKS =========================================================== //
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allLinks, setAllLinks] = useState([]); // Menyimpan semua link
  const [links, setLinks] = useState([]);       // Menyimpan hasil filter
  const [formData, setFormData] = useState({ category: '', search: '' });
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [errorLinks, setErrorLinks] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoadingLinks(true);
    try {
      const data = await getLinks();
      setAllLinks(data);
      setLinks(data);
    } catch (err) {
      setErrorLinks('Failed to load links');
    } finally {
      setLoadingLinks(false);
    }
  };   

  const handleDelete = async (id) => {
    await deleteLink(id);
    fetchLinks();
  };

  const handleSearch = () => {
    const filteredLinks = allLinks.filter(link =>
      link.title.toLowerCase().includes(formData.search.toLowerCase())
    );
    setLinks(filteredLinks);
  };  

  const handleToggleActive = async (id, currentStatus) => {
    try {
      // Panggil fungsi untuk memperbarui status
      await updateLinkStatus(id, currentStatus);
  
      // Refresh data setelah status diperbarui
      fetchLinks();
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };   

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false) // Tutup modal setelah animasi selesai
    }, 300) // Waktu sesuai durasi animasi (0.3s)
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const openEditModal = (link) => {
    setEditFormData(link);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  // =========================================================== LINKS =========================================================== //


  // =========================================================== BANNER MODAL =========================================================== //
  const [isBannerOpen, setIsBannerOpen] = useState(false)
  const [isBannerClosing, setIsBannerClosing] = useState(false)

  const [bannerData, setBannerData] = useState({
    title: '',
    mediaType: 'image',
    mediaFile: null,
    link: '',
    description: ''
  })

  const openBanner = () => {
    setIsBannerOpen(true)
    setIsBannerClosing(false)
  }

  const closeBanner = () => {
    setIsBannerClosing(true)
    setTimeout(() => {
      setIsBannerOpen(false) // Tutup modal setelah animasi selesai
    }, 300) // Waktu sesuai durasi animasi (0.3s)
  }

  const [isEditBannerOpen, setIsEditBannerOpen] = useState(false);
  const [editBannerData, setEditBannerData] = useState({});
  // const [banner, setBanner] = useState([]);

  const openEditBanner = () => {
    // setEditFormData(linkData);
    setIsEditBannerOpen(true);
  };

  const closeEditBanner = () => {
    setIsEditBannerOpen(false);
  };
  // =========================================================== BANNER MODAL =========================================================== //


  // =========================================================== TABS CONTENT =========================================================== //
  const [activeTab, setActiveTab] = useState('Links')
  const [previousTab, setPreviousTab] = useState(null)
  const [direction, setDirection] = useState('right')
  const [isAnimating, setIsAnimating] = useState(false)

  const tabs = ['Links', 'Banners', 'Categories', 'Profile']

  const handleTabClick = (tabName) => {
    if (tabName !== activeTab && !isAnimating) {
      setIsAnimating(true)
      const currentIndex = tabs.indexOf(activeTab)
      const newIndex = tabs.indexOf(tabName)
      const newDirection = newIndex > currentIndex ? 'right' : 'left'

      setDirection(newDirection)
      setPreviousTab(activeTab)
      setActiveTab(tabName)

      // Reset animating state after animation completes
      setTimeout(() => {
        setIsAnimating(false)
        setPreviousTab(null)
      }, 300)
    }
  }

  const getTabClassName = (tabName) => {
    if (tabName === activeTab) {
      return `${styles.tabPanel} ${styles.entering} ${styles[direction]}`
    }
    if (tabName === previousTab) {
      return `${styles.tabPanel} ${styles.leaving} ${styles[direction]}`
    }
    return styles.tabPanel
  }

  // Function to render content based on active tab
  const renderTabContent = (tabName) => {
    switch (tabName) {
      case 'Links':
        return (
          <div className={getTabClassName('Links')} style={{ padding: '2rem', maxHeight: '600px', overflow: 'auto' }}>
            <div className={styles.blockList}>
              <button className={styles.addBlock} onClick={openModal}>
                + Add New Links
              </button>
              <br></br>
              <br></br>
              <h2 className={styles.sectionTitle}>Links List</h2>

              <div className={styles.searchContainer}>
                <div className={styles.search}>
                  <span className={styles.searchIcon}>📦</span>
                  <select
                    id="category"
                    value={formData.category}
                    className={styles.urlInput}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {loadingLinks ? (
                      <option disabled>Loading...</option>
                    ) : errorLinks ? (
                      <option disabled>{errorLinks}</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.category_name}>
                          {category.category_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <div className={styles.searchContainer}>
                <div className={styles.search}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.urlInput}
                    value={formData.search}
                    onChange={(e) => setFormData({ ...formData, search: e.target.value })}
                  />
                </div>
                <button onClick={handleSearch} className={styles.searchButton}>
                  Search
                </button>
              </div>

              <div className={styles.block}>
                {loading ? (
                    <p style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>Loading...</p>
                  ) : error ? (
                    <p style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px", color: "red" }}>{error}</p>
                  ) : links.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>Tidak ada links.</p>
                  ) : (
                  links.map((link) => (
                    <div key={link.id} className={styles.blockHeader}>
                      <span className={styles.dragButton}>⋮⋮</span>
                      <div className={styles.blockIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
                      <span>{link.title}</span>
                      <div className={styles.blockActions}>
                        <button onClick={() => openEditModal(link)}>✏️</button>
                        <button onClick={() => handleDelete(link.id)}>🗑️</button>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            // Ubah status menjadi boolean: active -> true, non_active -> false
                            checked={link.is_active === "active"}
                            onChange={() => handleToggleActive(link.id, link.is_active)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )
      case 'Banners':
        return (
          <div className={getTabClassName('Banners')} style={{ padding: '2rem', maxHeight: '600px', overflow: 'auto' }}>
            <button className={styles.addBlock} onClick={openBanner} style={{ marginTop: '-2px' }}>
              + Add New Banners
            </button>

            <br></br>
            <br></br>
            <h2 className={styles.sectionTitle}>Banners</h2>

            <div className={styles.searchContainer}>
              <div className={styles.search}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.urlInput}
                />
              </div>
              <button className={styles.searchButton}>
                Search
              </button>
            </div>

            <div className={styles.linkItem}>
              <div className={styles.itemContent}>
                <div className={styles.linkItemLeft}>
                  <span className={styles.menuIcon}>⋮</span>
                  <img
                    src="/images/avatar-fix.jpg"
                    alt="Cat"
                    className={styles.bannerImage}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div className={styles.linkDetails}>
                    <span className={styles.linkTitle}>Cat</span>
                    <span className={styles.linkUrl}>very cute</span>
                  </div>
                </div>
                <div className={styles.statsRow} style={{ marginTop: '0.5rem' }}>
                  <span className={styles.clickStats}>0 clicks since Jan 21, 2025</span>
                </div>
              </div>
              <div className={styles.linkToggle}>
                <button className={styles.editButton} onClick={openEditBanner}>✏️</button>
                <button className={styles.deleteButton} onClick={() => deleteBanner()}>🗑️</button>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
            <div className={styles.linkItem}>
              <div className={styles.itemContent}>
                <div className={styles.linkItemLeft}>
                  <span className={styles.menuIcon}>⋮</span>
                  <img
                    src="/images/banner-bg-fix.jpg"
                    alt="Cat"
                    className={styles.bannerImage}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div className={styles.linkDetails}>
                    <span className={styles.linkTitle}>Milk</span>
                    <span className={styles.linkUrl}>very yummy</span>
                  </div>
                </div>
                <div className={styles.statsRow} style={{ marginTop: '0.5rem' }}>
                  <span className={styles.clickStats}>0 clicks since Jan 21, 2025</span>
                </div>
              </div>
              <div className={styles.linkToggle}>
                <button className={styles.editButton}>✏️</button>
                <button className={styles.deleteButton}>🗑️</button>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </div>
        )
      case 'Categories':
        return (
          <div className={getTabClassName('Categories')} style={{ padding: '2rem', maxHeight: '600px', overflow: 'auto' }}>
            <div className={styles.linkInputSection}>
              <div className={styles.linkInputContainer}>
                <div className={styles.linkInput}>
                  <img src="/images/logo-fix.jpg" alt="Health" className={styles.linkTypeIcon} />
                  <input
                    type="text"
                    placeholder="Create new category"
                    className={styles.urlInput}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <button className={styles.addLinkButton} onClick={handleAddCategory}>
                  + Add New Category
                </button>
              </div>

              <h2 className={styles.sectionTitle}>Categories</h2>

              <div className={styles.searchContainer}>
                <div className={styles.search}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.urlInput}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                {/* <button className={styles.searchButton}>
                    Search
                </button> */}
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
              ) : (
                <div>
                  {filteredCategories.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>Tidak ada kategori.</p>
                  ) : (
                    filteredCategories.map((category) => (
                      <div key={category.id} className={styles.linkItem}>
                        <div className={styles.linkItemLeft}>
                          <span className={styles.menuIcon}>⋮</span>
                          <div className={styles.linkIcon}>📦</div>
                          <div className={styles.linkDetails}>
                            <span className={styles.linkTitle}>{category.category_name}</span>
                          </div>
                        </div>
                        <div className={styles.linkToggle}>
                          <div className={styles.blockActions}>
                            <button onClick={() => openEditCategory(category)}>✏️</button>
                            <button onClick={() => handleDeleteCategory(category.id, refreshCategories)}>🗑️</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )
      case 'Profile':
        return (
          <div className={getTabClassName('Profile')} style={{ padding: '2rem', maxHeight: '600px', overflow: 'auto' }}>
            <div className={styles.profileContainer}>
              <h2 className={styles.sectionTitle}>Profile</h2>
              <form onSubmit={handleEditProfile}>
                <div className={styles.card}>
                  <h3 className={styles.label}>Avatar</h3>
                  <div className={styles.profilePhotoSection}>
                    <img
                      src={previewAvatar || "/images/avatar.jpg"}
                      alt="Profile"
                      className={styles.profilePhoto}
                    />
                    <div className={styles.photoInfo}>
                      <p className={styles.photoHelperText}>
                        For best results, upload a photo that's 130 x 130 pixels.
                      </p>

                      {/* Custom File Input */}
                      <label className={styles.uploadButton}>
                        Choose
                        <input
                          type="file"
                          onChange={handleAvatarChange}
                          style={{ display: "none" }} // Hide the default file input
                        />
                      </label>

                      {/* Hapus Avatar */}
                      {previewAvatar && (
                        <button type="button" onClick={handleDeleteAvatar} className={styles.delete_button}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Username
                    </label>
                    <input
                      type="text"
                      name="username" value={profile.username || ""} onChange={handleChange}
                      className={styles.input}
                    />
                    <p className={styles.helperText}>
                      If you change your username, it won't change your link or your profile name.
                    </p>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Name
                    </label>
                    <input
                      type="text"
                      name="name" value={profile.name || ""} onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Bio
                    </label>
                    <textarea
                      name="bio" value={profile.bio || ""} onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone" value={profile.phone || ""} onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Province
                    </label>
                    <input
                      type="text"
                      name="province" value={profile.province || ""} onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city" value={profile.city || ""} onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      Subdistrict
                    </label>
                    <input
                      type="text"
                      name="subdistrict" value={profile.subdistrict || ""} onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button className={styles.submitButton} type="submit">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  // =========================================================== TABS CONTENT =========================================================== //


  // =========================================================== PREVIEW CONTENT =========================================================== //
  const PreviewContent = () => (
    <div className={styles.previewWrapper}>
      <div className={styles.previewHeader}>
        <button className={`${styles.previewButton} ${pathname === '/baralynk.id/'}`} onClick={() => navigateToPage('/user/preview')}>
          Preview
        </button>
        {/* <button className={styles.previewOptionsButton}>⋮</button> */}
      </div>
      <div className={styles.phoneWrapper}>
        <div className={styles.phone}>
          <div className={styles.phoneContent}>
            <div className={styles.previewBanner}>
              <img src={previewAvatar || "/images/avatar.jpg"} alt="Profile" className={styles.previewAvatar} />
            </div>
            <div className={styles.previewProfile}>
              <h3>{profile.name || ""}</h3>
              <p>{profile.bio || ""}</p>
            </div>

            {/* Banner Slider */}
            <div className={styles.bannerSlider} style={{ marginTop: '-15px' }}>
              <button
                className={styles.sliderButton}
                onClick={prevSlide}
                style={{ left: 0 }}
              >
                ←
              </button>
              <div className={styles.bannerContainer}>
                <img
                  src={banners[currentSlide].image}
                  alt={banners[currentSlide].alt}
                  className={styles.bannerImage}
                />
              </div>
              <button
                className={styles.sliderButton}
                onClick={nextSlide}
                style={{ right: 0 }}
              >
                →
              </button>
            </div>

            <div className={styles.previewLinks} style={{ marginTop: '-15px' }}>
              <div className={styles.searchContainer}>
                <div className={styles.search}>
                  <span className={styles.searchIcon}>📦</span>
                  <select
                    id="category"
                    value={formData.category}
                    className={styles.urlInput}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {loading ? (
                      <option disabled>Loading...</option>
                    ) : error ? (
                      <option disabled>{error}</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.category_name}>
                          {category.category_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
              <div className={styles.searchContainerPreview}>
                <div className={styles.search}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search"
                    className={styles.urlInput}
                  />
                </div>
              </div>
              <div className={styles.previewLink}>
                <div className={styles.previewLinkIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
                <span>My website</span>
                <span className={styles.previewArrow}>→</span>
              </div>
              <div className={styles.previewLink}>
                <div className={styles.previewLinkIcon} style={{ backgroundColor: '#86A788' }}>🔗</div>
                <span>My Instagram</span>
                <span className={styles.previewArrow}>→</span>
              </div>
              <div className={styles.previewLink}>
                <div className={styles.previewLinkIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
                <span>My Twitter</span>
                <span className={styles.previewArrow}>→</span>
              </div>
            </div>
            <div className={styles.fixedLoginButton}>
              <button className={styles.loginButton}>baralynk.is/yourpage →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  // =========================================================== PREVIEW CONTENT =========================================================== //


  return (
    <div className={styles.pageContent}>
      <div className={styles.profileHeader}>
        {/* awalnya ada background sama avatar */}
        <div className={styles.profileInfo}>
          {/* awalnya ada info profile */}
          <div className={styles.linkSection}>
            <div className={styles.linkBox}>
              <div className={styles.linkHeader}>
                <span>Baralynk.id Link</span>
                <a href="#" onClick={openCustomize} className={styles.customizeLink}>Customize Url →</a>
              </div>
              <div className={styles.linkContent}>
                <div className={styles.urlWrapper}>
                  <span className={styles.linkIcon}>🔗</span>
                  <input
                    type="text"
                    readOnly
                    value="https://baralynk.id/fenttyy"
                    className={styles.urlInput}
                  />
                </div>
                <button className={styles.shareButton}>
                  <span className={styles.shareIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Share Url
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div
            className={`${styles.editorSection} ${isExpanded ? styles.expanded : ''}`}
            ref={editorRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.dragHandle} onClick={handleDragHandleClick} />
            <div className={styles.tabsContainer}>
              <div className={styles.tabs}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                    onClick={() => handleTabClick(tab)}
                    disabled={isAnimating}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.tabContent}>
              {tabs.map(tab => (
                <div key={tab} className={getTabClassName(tab)}>
                  {renderTabContent(tab)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.previewSection}>
            <PreviewContent />
          </div>
        </div>
      </div>

      <AddLinksModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        refreshLinks={fetchLinks}
      />

      <AddBannersModal
        isBannerOpen={isBannerOpen}
        closeBanner={closeBanner}
      />

      {isEditModalOpen && (
        <EditLinkModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          formData={editFormData}
          setFormData={setEditFormData}
        // onSave={saveEdit}
        />
      )}

      {isEditCategoryOpen && (
        <EditCategoryModal
          isOpen={isEditCategoryOpen}
          onClose={closeEditCategory}
          formData={editCategoryData}
          setFormData={setEditCategoryData}
          onSave={handleEditCategory}
        />
      )}

      {isEditBannerOpen && (
        <EditBannerModal
          isOpen={isEditBannerOpen}
          onClose={closeEditBanner}
          formData={editBannerData}
          setFormData={setEditBannerData}
        // onSave={saveEdit}
        />
      )}

      {isCustomizeOpen && (
        <CustomizeUrl
          isOpen={isCustomizeOpen}
          onClose={closeCustomize}
          formData={customizeData}
          setFormData={setCustomizeData}
        // onSave={saveEdit}
        />
      )}

    </div>
  )
}