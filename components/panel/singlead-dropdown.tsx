const dropdownData = [
  { title: "جنسیت", options: ["زن", "مرد"] },
  { title: "محل سکونت", options: ["تهران", "آذربایجان"] },
  { title: "سابقه کار", options: ["تهران", "آذربایجان"] },
  { title: "نوع فعالیت", options: ["تهران", "آذربایجان"] },
  { title: "رنج حقوقی", options: ["تهران", "آذربایجان"] },
  { title: "نظام وظیفه", options: ["تهران", "آذربایجان"] },
  { title: "وضعیت تاهل", options: ["تهران", "آذربایجان"] },
  { title: "مرتبط بودن آگهی", options: ["تهران", "آذربایجان"] },
  { title: "سطح کارجو", options: ["تهران", "آذربایجان"] },
];
const SingleadDropdown = () => {
  return dropdownData.map((item) => (
    <select
      required
      className="font-semibold w-full outline-none border border-b-black"
      key={item.title}
    >
      <option value="" hidden>
        {item.title}
      </option>
      {item.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  ));
};
export default SingleadDropdown;
