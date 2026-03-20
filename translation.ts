import type { TranslationText } from "./src/hooks/locales";

const translation = {
  collection: {
    en: "Collections",
    vi: "Bộ Sưu tập",
  },
  contact: {
    en: "Contact",
    vi: "Liên hệ",
  },
  "about-us": {
    en: "About Us",
    vi: "Về chúng tôi",
  },
  navigation: {
    vi: "Điều hướng",
    en: "Navigation",
  },
  rights: {
    en: "All Rights Reserved.",
    vi: "Bảo lưu toàn quyền.",
  },
  office: {
    en: "Office",
    vi: "Văn phòng",
  },
  viewCollection: {
    en: "View Collection",
    vi: "Xem bộ sưu tập",
  },
  philosophy: {
    en: "Our philosophy",
    vi: "Triết lý của chúng tôi",
  },
  member: {
    en: "Member",
    vi: "Thành viên",
  },
  memberSubtitle: {
    en: "Meet the experts behind Budapest's most exclusive real estate transactions.",
    vi: "Gặp gỡ các chuyên gia đằng sau các giao dịch bất động sản độc quyền nhất của Budapest.",
  },
  featuredResidences: {
    en: "Featured Residences",
    vi: "Dinh Thự Nổi Bật",
  },
  exclusivePortfolio: {
    en: "Exclusive Portfolio",
    vi: "Danh mục độc quyền",
  },
  bathrooms: {
    en: "Bathrooms",
    vi: "Phòng tắm",
  },
  bedrooms: {
    en: "Bedrooms",
    vi: "Phòng ngủ",
  },
  livingArea: {
    en: "Living area",
    vi: "Diện tích",
  },
  district: {
    vi: "Quận",
    en: "District",
  },
  viewMore: {
    vi: "Xem thêm",
    en: "View more",
  },
  latestAcquisitions: {
    vi: "Mới nhất",
    en: "Latest",
  },
  saleProperty: {
    vi: "Căn hộ bán",
    en: "For sale",
  },
  rentProperty: {
    vi: "Căn hộ thuê",
    en: "For rent",
  },
  closedProperty: {
    vi: "Ngừng giao dịch",
    en: "Closed",
  },
  rooms: {
    vi: "Số phòng",
    en: "Rooms",
  },
} satisfies TranslationText;

export { translation };

export type TranslationKey = keyof typeof translation;
