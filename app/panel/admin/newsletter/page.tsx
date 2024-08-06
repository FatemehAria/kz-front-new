"use client";
import vieweye from "@/public/ViewUsers/vieweye.svg";
import {
  deleteNewsLetter,
  getAllNewsletters,
  restoreBrand,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import NotFound from "../components/NotFound";

function NewsLetter() {
  const [newsLetters, setNewsLetters] = useState([]);
  const { token } = useSelector((state: any) => state.userData);
  const [newsletterIsDeleted, setNewsLetterIsDeleted] = useState(false);
  const [newLetterStatus, setNewsLetterStatus] = useState({
    loading: false,
    erorr: "",
  });
  useEffect(() => {
    getAllNewsletters(token, setNewsLetters, setNewsLetterStatus);
  }, []);

  const [editField, setEditField] = useState({
    showEditField: false,
    editTitle: "",
    editDesc: "",
  });

  const handleNewsletterEdit = async (id: number) => {
    // const selectedNewsLetter = newsLetters.find((item) => item.id === id);
    // if (selectedNewsLetter) {
    //   setNewsLetters((last) =>
    //     last.map((item) =>
    //       item.brand.id === id
    //         ? {
    //             ...item,
    //             brand: {
    //               ...item.brand,
    //               title:
    //                 editField.editTitle !== ""
    //                   ? editField.editTitle
    //                   : item.brand.title,
    //               description:
    //                 editField.editDesc !== ""
    //                   ? editField.editDesc
    //                   : item.brand.description,
    //             },
    //           }
    //         : item
    //     )
    //   );
    // }
    // await updateNewsLetter(token, id, editField.editTitle, editField.editDesc);
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="flex">
        <Link
          href={`/panel/admin/newsletter/create-newsletter`}
          className="text-white bg-[#4866CF] p-2 rounded-[5px]"
        >
          + ایجاد خبرنامه جدید
        </Link>
      </div>
      <div className="bg-white shadow mx-auto rounded-2xl w-full p-[3%] text-center space-y-3">
        <div className="grid grid-cols-4">
          <div>ردیف</div>
          <div>عنوان خبرنامه</div>
          <div>توضیحات</div>
          <div>عملیات</div>
        </div>

        {newLetterStatus.loading ? (
          <SkeletonTheme>
            <Skeleton count={1} className="p-2" baseColor="#EAEFF6" />
          </SkeletonTheme>
        ) : newLetterStatus.erorr ? (
          <NotFound text={`${newLetterStatus.erorr}`} />
        ) : (
          newsLetters.map((item: any, index) => (
            <div
              className={`${
                newsletterIsDeleted && item.deleted_at
                  ? "bg-red-300"
                  : "bg-[#EAEFF6]"
              } grid grid-cols-4 gap-x-5 text-center py-1 rounded-[4px] cursor-pointer`}
              key={index}
            >
              <p>{index + 1}</p>
              <input
                value={
                  editField.showEditField
                    ? editField.editTitle
                    : item.brand.title
                }
                onChange={(e) =>
                  setEditField((last) => ({
                    ...last,
                    editTitle: e.target.value,
                  }))
                }
                className={`${
                  editField.showEditField
                    ? "bg-white"
                    : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
                } outline-none`}
              />
              <input
                value={
                  editField.showEditField
                    ? editField.editDesc
                    : item.brand.description
                }
                onChange={(e) =>
                  setEditField((last) => ({
                    ...last,
                    editDesc: e.target.value,
                  }))
                }
                className={`${
                  editField.showEditField
                    ? "bg-white"
                    : "bg-[#EAEFF6] caret-transparent cursor-default text-center"
                } outline-none`}
              />
              <div className="flex flex-row items-center justify-center gap-3">
                <Link
                  href={`/panel/admin/brands/brand-detail?id=${item.brand.id}`}
                  className="flex justify-center"
                >
                  <Image src={vieweye} alt="مشاهده" width={20} height={20} />
                </Link>
                <span
                  onClick={() =>
                    deleteNewsLetter(token, item.id, setNewsLetterIsDeleted)
                  }
                  className="flex justify-center"
                >
                  <RxCross1 className="text-red-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    restoreBrand(item.id, token, setNewsLetterIsDeleted)
                  }
                >
                  <MdOutlineSettingsBackupRestore className="text-yellow-600 text-lg" />
                </span>
                <span
                  onClick={() =>
                    setEditField((last) => ({
                      ...last,
                      showEditField: !last.showEditField,
                    }))
                  }
                  className="flex justify-center"
                >
                  {editField.showEditField ? (
                    <FaCheck
                      onClick={() => handleNewsletterEdit(item.brand.id)}
                      className="text-green-600 text-lg"
                    />
                  ) : (
                    <AiOutlineEdit className="text-green-600 text-lg" />
                  )}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsLetter;
