// import { Layout } from "@/components/layout/Layout";
// import { PageView } from "@/components/utility/PageView";
import DesignSystemNavigator from "@/components/showcase/DesignSystemNavigator";
import { createClient } from "@/prismicio";
import path from "path";
import fs from "fs"
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/main";
import { Providers } from "@/components/layout/Providers";

export default async function Home() {

  const client = createClient();

  const sliceSectionsMain = await client.getAllByType("slice_section",
    {
      orderings: {
        field: 'my.slice_section.uid'
      }
    });
  //const slicesMain = await readSlicesFiles("main")

  const libraries = [
    {
      id: "main",
      name: "Prismic.io",
      sliceSections: sliceSectionsMain,
      //sliceFiles: slicesMain
    },
  ]
  return (
    <Providers>
      <DesignSystemNavigator libraries={libraries} />
    </Providers>
    // <SliceZone components={components} slices={sliceSectionsMain[0].data.slices} />
    // <Layout
    //   theme={theme}
    //   noBanner={page.data.hide_global_banner}
    //   pageId={page.id}
    // >
    // <PageView page={page} contentGroup="Website" />
    // <script
    //   type="application/ld+json"
    //   dangerouslySetInnerHTML={schema}
    //   key="item-jsonld-home"
    // />
    // <SliceZone
    //   slices={page.data.slices}
    //   components={components}
    //   context={{
    //     theme: page.data.theme,
    //     updated: page.last_publication_date
    //   }}
    // />
    // </Layout>
  );
}


// const readSlicesFiles = async (library: string) => {
//   const directoryPath = path.join(process.cwd(), 'src/slices/' + library);
//   let slicesArray: { id: string, model: string, component: string, images: { name: string, base64: string }[] }[] = [];

//   try {
//     const slices = fs.readdirSync(directoryPath);
//     for (const slice of slices) {
//       const modelFilePath = path.join(directoryPath, slice, 'model.json');
//       const componentFilePath = path.join(directoryPath, slice, 'index.tsx');
//       if (fs.existsSync(modelFilePath) && fs.existsSync(componentFilePath)) {
//         const slicePath = path.join(directoryPath, slice);
//         const filesInSlice = fs.readdirSync(slicePath);
//         const rawModelData = fs.readFileSync(modelFilePath, 'utf8');
//         const jsonData = JSON.parse(rawModelData);
//         const rawComponentData = fs.readFileSync(componentFilePath, 'utf8');

//         // Read PNG files
//         const images: { name: string, base64: string }[] = [];
//         // Iterate over each file in the slice directory
//         for (const file of filesInSlice) {
//           const filePath = path.join(slicePath, file);

//           // Check if the file is a PNG image
//           if (file.endsWith('.png') && fs.existsSync(filePath)) {
//             const imageBuffer = fs.readFileSync(filePath);
//             const imageBase64 = imageBuffer.toString('base64');
//             images.push({ name: file, base64: `data:image/png;base64,${imageBase64}` });
//           }
//         }
//         slicesArray.push({ id: jsonData.id, model: jsonData, component: rawComponentData, images: images });
//       }
//     }
//   } catch (err) {
//     console.error('Error reading files:', err);
//   }

//   return slicesArray;
// };