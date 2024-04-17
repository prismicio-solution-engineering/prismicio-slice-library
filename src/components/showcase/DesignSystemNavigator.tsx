'use client'
import React, { useState } from 'react';
import { AllDocumentTypes } from '../../prismicio-types';
import { SliceZone } from '@prismicio/react';
import { SharedSlice } from '@prismicio/client';
import { components } from '@/slices/main';

// Define types for clarity
type WebsiteSection = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  websiteSections: SharedSlice[];
  // files: {
  //   id: string;
  //   model: string;
  //   component: string;
  //   images: {
  //     name: string;
  //     base64: string;
  //   }[];
  // }
};

type Brand = {
  id: string;
  name: string;
  categories: Category[];
};


interface Window {
  showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
}

// Augment the Window type (can also be done in a separate .d.ts file)
declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
  }
}

function snakeToPascal(str: string) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Button component for slice add to project
// const AddToProjectButton = (slice: {
//   id: string;
//   model: string;
//   component: string;
//   images: {
//     name: string;
//     base64: string;
//   }[];
// }) => {

//   const handleButtonClick = async () => {
//     if (!window.showDirectoryPicker) {
//       alert("Your browser does not support directory selection.");
//       return;
//     }

//     try {
//       const directoryHandle = await window.showDirectoryPicker();
//       // Add your logic to handle file download and saving to the selected directory
//       console.log("Directory selected:", directoryHandle);


//       const indexFileHandle = await directoryHandle.getFileHandle('index.ts', { create: true });
//       // Read the contents of the file
//       const file = await indexFileHandle.getFile();
//       let contents = await file.text();

//       // Add the new line
//       if (!contents.includes(slice.id)) {

//         // Find the position of the last closing brace and insert the new line before it
//         const insertionPoint = contents.lastIndexOf('};');
//         if (insertionPoint !== -1) {
//           const newComponent = '  ' + slice.id + ': dynamic(() => import("./' + snakeToPascal(slice.id) + '")),\n';
//           contents = contents.substring(0, insertionPoint) + newComponent + contents.substring(insertionPoint);
//         }
//         // Write the changes back to the file
//         const indexFilewritable = await indexFileHandle.createWritable();
//         await indexFilewritable.write(contents);
//         await indexFilewritable.close();

//         // Create a new folder in the selected directory
//         const newFolderHandle = await directoryHandle.getDirectoryHandle(snakeToPascal(slice.id), { create: true });

//         const fileHandle = await newFolderHandle.getFileHandle('model.json', { create: true });
//         const writable = await fileHandle.createWritable();
//         await writable.write(JSON.stringify(slice.model));
//         await writable.close();

//         const componentFileHandle = await newFolderHandle.getFileHandle('index.tsx', { create: true });
//         const componentWritable = await componentFileHandle.createWritable();
//         await componentWritable.write(slice.component);
//         await componentWritable.close();

//         // Convert base64 string to a Blob
//         for (let i = 0; i < slice.images.length; i++) {
//           const imageBlob = base64ToBlob(slice.images[i].base64);

//           // Create a new file and write the Blob to it
//           const imageFileHandle = await newFolderHandle.getFileHandle(slice.images[i].name, { create: true });
//           const imageWritable = await imageFileHandle.createWritable();
//           await imageWritable.write(imageBlob);
//           await imageWritable.close();
//         }

//       }
//       else {
//         alert("A slice with same name already exists in your repo")
//       }

//       console.log("Files written successfully");
//     } catch (err) {
//       console.error("Error selecting directory:", err);
//     }
//   };

//   // Function to convert base64 to Blob
//   function base64ToBlob(base64: string) {
//     const binaryString = window.atob(base64.split(',')[1]);
//     const bytes = new Uint8Array(binaryString.length);

//     for (let i = 0; i < binaryString.length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }

//     return new Blob([bytes], { type: 'image/png' });
//   }

//   return (
//     <button className="font-bold p-2 rounded-md bg-gray-300 hover:bg-gray-500 hover:text-gray-200" onClick={handleButtonClick}>
//       Add to my project
//     </button>
//   )
// };

const DesignSystemNavigator = ({ libraries }: {
  libraries: {
    id: string;
    name: string;
    sliceSections: AllDocumentTypes[];
    // sliceFiles: {
    //   id: string;
    //   model: string;
    //   component: string;
    //   images: {
    //     name: string;
    //     base64: string;
    //   }[];
    // }[]
  }[]
}) => {

  // Mock Data - Replace with actual data fetch or prop
  const brands: Brand[] =
    libraries.map((library) => ({
      id: library.id,
      name: library.name,
      categories: library.sliceSections.map((sectionType) => ({
        id: sectionType.data.slices[0]?.slice_type!,
        name: sectionType.data.slice_name ? sectionType.data.slice_name : sectionType.data.slices[0]?.slice_type!,
        websiteSections: sectionType.data.slices.map((section) => ({
          name: section.variation, ...section
        })),
        //files: library.sliceFiles.filter(slice => slice.id === sectionType.data.slices[0]?.slice_type!)[0]
      })),
    }))
    ;
  const [selectedBrandId, setSelectedBrandId] = useState<string>(brands[0].id);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(brands[0].categories[0].id);
  const [selectedSectionId, setSelectedSectionId] = useState<string>(brands[0].categories[0].websiteSections[0].id);

  const selectedBrand = brands.find(brand => brand.id === selectedBrandId);
  const selectedCategory = selectedBrand?.categories.find(category => category.id === selectedCategoryId);
  const selectedSection = selectedCategory?.websiteSections.find(section => section.id === selectedSectionId);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-EE p-5 shrink-0">
      </div>
      <div className="w-64 bg-gray-EE p-5 fixed h-screen z-50">
        <div className="font-bold">Brands</div>
        {brands.map(brand => (
          <div
            key={brand.id}
            className={`cursor-pointer p-2 ${brand.id === selectedBrandId ? 'bg-gray-AC text-black' : 'hover:bg-gray-EE'}`}
            onClick={() => {
              setSelectedBrandId(brand.id);
              setSelectedCategoryId(brand.categories[0].id);
              setSelectedSectionId(brand.categories[0].websiteSections[0].id);
            }}
          >
            {brand.name}
          </div>
        ))}
        <div className="mt-4 font-bold">Categories</div>
        {selectedBrand?.categories.map(category => (
          <div
            key={category.id}
            className={`cursor-pointer p-2 ${category.id === selectedCategoryId ? 'bg-gray-AC text-black' : 'hover:bg-gray-EE'}`}
            onClick={() => {
              setSelectedCategoryId(category.id);
              setSelectedSectionId(category.websiteSections[0].id);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="bg-gray-F7 p-3 flex gap-4 fixed w-full z-40">
        <div className='pl-[17.25rem] flex flex-wrap'>
          {selectedCategory?.websiteSections.map(section => (
            <div
              key={section.id}
              className={`cursor-pointer p-2 ${section.id === selectedSectionId ? 'bg-gray-EE text-black' : 'hover:bg-gray-F7'}`}
              onClick={() => setSelectedSectionId(section.id)}
            >
              {section.variation}
            </div>
          ))}
        </div>
        {/* <div className='grow flex justify-end'>
          <AddToProjectButton {...selectedCategory!.files} />
        </div> */}
      </div>
      <div className="flex-1">
        {/* <div className="bg-gray-200 p-3 flex gap-4 fixed w-full z-50">
          {selectedCategory?.websiteSections.map(section => (
            <div
              key={section.id}
              className={`cursor-pointer p-2 ${section.id === selectedSectionId ? 'bg-slate-400 text-white' : 'hover:bg-slate-200'}`}
              onClick={() => setSelectedSectionId(section.id)}
            >
              {section.variation}
            </div>
          ))}
          <AddToProjectButton {...selectedCategory!.files} />
        </div> */}
        <div className="p-5 mt-28 border-4 border-gray-A4">
          {selectedSection ?
            <>
              <SliceZone slices={[selectedSection]} components={{ ...components }} />
            </> : <div>Select a section</div>}
        </div>
      </div>
    </div>
  );
};

export default DesignSystemNavigator;
