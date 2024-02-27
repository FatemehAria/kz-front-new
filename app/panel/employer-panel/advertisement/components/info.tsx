import AdCheckbox from "@/components/panel/ad-checkbox";
import AdDropdown from "@/components/panel/ad-dropdown";

const Info = () => {
  return (
    <div className="font-YekanBakh font-semibold">
      <div className="grid grid-cols-2 gap-y-8">
        <AdDropdown
          title="عنوان شغلی :"
          defaultOption="جستجو شغل..."
          options="شغل یک"
        />
        <AdDropdown
          title="حداقل مدرک مرتبط :"
          defaultOption="جستجو شغل..."
          options="شغل یک"
        />
        <AdDropdown
          title="نوع همکاری :"
          defaultOption="جستجو شغل..."
          options="شغل یک"
        />

        <AdDropdown
          title="ابزارها و مهارت ها :"
          defaultOption="جستجو شغل..."
          options="شغل یک"
        />
        <AdDropdown
          title="موقعیت محل اشتغال :"
          defaultOption="جستجو شغل..."
          options="شغل یک"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label>جنسیت :</label>
            <div className="flex gap-3">
              <AdCheckbox label="زن" />
              <AdCheckbox label="مرد" />
              <AdCheckbox label="فرقی ندارد" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label>بازه سنی :</label>
            <div className="flex items-center gap-3">
              <input type="text" className="border w-10 h-8 bg-[#F0F0F0] p-1" />
              <span>تا</span>
              <input type="text" className="border w-10 h-8 bg-[#F0F0F0] p-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="py-4">شرح شغل و مسئولیت های مورد انتظار :</label>
        <textarea
          rows={4}
          cols={50}
          className="border mb-8 p-4"
          name="job-description"
        ></textarea>
      </div>
    </div>
  );
};
export default Info;
