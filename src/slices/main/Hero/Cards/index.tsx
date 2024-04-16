import { SliceLayout } from "@/components/layout/SliceLayout";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";

import { BentoCard } from "./BentoCard";

import type { SliceZoneContext } from "@/lib/types";
export type HeroDefaultProps = {
  slice: Content.MainHeroSliceCards;
  context: SliceZoneContext;
};

const HeroDefault = ({ slice, context }: HeroDefaultProps) => {
  return (
    <SliceLayout theme={context.theme ?? "light"} className="overflow-hidden">
      <div className="container flex flex-col gap-12">
        <div>
          {isFilled.keyText(slice.primary.eyebrow) && (
            <Eyebrow
              text={slice.primary.eyebrow}
              color={slice.primary.eyebrow_color}
            />
          )}
          {isFilled.title(slice.primary.heading) && (
            <div className="sm:flex items-center gap-6">
              <Heading
                field={slice.primary.heading}
                size="3xl"
                className="sm:shrink-0"
              />
              <div className="relative w-full">
                <div className="hidden xl:block absolute top-1/2 -translate-y-1/2 -right-20 left-0 mt-1 lg:-right-40">
                  <svg
                    viewBox="0 0 849 197"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    <path
                      d="M698.474 147.787L640.346 185.857C636.503 188.374 631.559 188.476 627.616 186.119L481 98.5L4 98.5"
                      stroke="#B382F2"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 95.5L481 95.5C481.542 95.5 482.074 95.6468 482.539 95.9248L629.552 183.781C632.354 185.455 635.842 185.482 638.669 183.85L696.975 145.189C698.41 144.36 700.245 144.852 701.073 146.287C701.902 147.722 701.41 149.557 699.975 150.385L641.668 189.046C636.957 191.766 631.143 191.722 626.474 188.931L480.172 101.5L4 101.5C2.34315 101.5 1 100.157 1 98.5C1 96.8431 2.34315 95.5 4 95.5Z"
                      stroke="#151515"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M752.594 180.217L642.686 117.174C639.328 115.248 639.338 110.402 642.703 108.49L694.737 78.9172C699.044 76.4696 704.324 76.4801 708.621 78.9449L819.852 142.748C823.251 144.697 823.188 149.622 819.74 151.484L766.212 180.392C761.948 182.694 756.797 182.628 752.594 180.217Z"
                      fill="#B382F2"
                      stroke="#151515"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M703.77 63.4871L614.974 113.952L687.109 155.33L759.245 196.707L848.042 146.242L703.77 63.4871Z"
                      fill="#151515"
                      fill-opacity="0.2"
                    />
                    <path
                      d="M615.588 69.7457L759.508 152.734L847.796 102.127L703.876 19.1379L615.588 69.7457Z"
                      fill="#3BBB96"
                      stroke="#151515"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M759.509 174.093V152.734L847.797 102.127L847.797 123.485L759.509 174.093Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M615.588 69.7457L759.508 152.734V174.093L615.588 91.1047V69.7457Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M762.635 67.743L815.704 98.1213L752.576 134.575L699.507 104.197L762.635 67.743Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M762.635 67.743L699.507 104.197L706.112 107.978L762.635 75.3376V67.743Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M815.706 98.1213L762.637 67.743V75.3376L809.102 101.935L815.706 98.1213Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M656.336 59.3887L700.119 83.3116L686.714 90.5265L642.931 66.6036L656.336 59.3887Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M656.336 59.3887L642.931 66.6036L645.732 68.1339L656.336 62.4266V59.3887Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M700.119 83.3116L656.336 59.3887V62.4266L697.318 84.8191L700.119 83.3116Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M688.137 44.4171C689.851 43.4277 692.63 43.4292 694.341 44.4204L726.19 62.8769C727.784 63.8005 727.885 65.2755 726.422 66.2689C724.78 67.3841 721.839 67.4528 720.046 66.4177L688.137 47.9952C686.426 47.0071 686.426 45.4051 688.137 44.4171Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M726.191 65.9153L694.342 47.4588V44.421L726.191 62.8775C727.73 63.7693 727.877 65.175 726.569 66.165C726.454 66.0781 726.328 65.9947 726.191 65.9153Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M694.341 44.4204C692.63 43.4292 689.851 43.4277 688.137 44.4171C686.574 45.3195 686.439 46.7339 687.731 47.7251C687.853 47.6309 687.989 47.5406 688.137 47.4549C689.851 46.4655 692.63 46.467 694.341 47.4582V44.4204Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M673.706 52.7711C675.42 51.7818 678.199 51.7833 679.909 52.7745L711.759 71.231C713.353 72.1546 713.454 73.6296 711.991 74.6229C710.349 75.7382 707.408 75.8068 705.615 74.7718L673.706 56.3493C671.995 55.3612 671.995 53.7592 673.706 52.7711Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M711.758 74.2694L679.908 55.8129V52.7751L711.758 71.2316C713.297 72.1234 713.444 73.5291 712.136 74.5191C712.021 74.4322 711.895 74.3488 711.758 74.2694Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M679.909 52.7745C678.199 51.7833 675.42 51.7818 673.706 52.7711C672.143 53.6735 672.008 55.0879 673.299 56.0791C673.422 55.985 673.558 55.8947 673.706 55.809C675.42 54.8196 678.199 54.8211 679.909 55.8123V52.7745Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M702.566 36.0631C704.28 35.0737 707.059 35.0752 708.769 36.0664L740.619 54.5229C742.213 55.4465 742.314 56.9215 740.851 57.9148C739.209 59.0301 736.268 59.0988 734.475 58.0637L702.566 39.6412C700.855 38.6531 700.855 37.0511 702.566 36.0631Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M740.62 57.5613L708.77 39.1048V36.067L740.62 54.5235C742.159 55.4153 742.306 56.821 740.998 57.811C740.883 57.7241 740.757 57.6407 740.62 57.5613Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M708.769 36.0664C707.059 35.0752 704.28 35.0737 702.566 36.0631C701.003 36.9654 700.868 38.3799 702.16 39.371C702.282 39.2769 702.418 39.1866 702.566 39.1009C704.28 38.1115 707.059 38.113 708.769 39.1042V36.0664Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M762.635 39.5941L815.704 69.9723L752.576 106.426L699.507 76.048L762.635 39.5941Z"
                      fill="white"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M762.635 36.5563L815.704 66.9346L752.576 103.389L699.507 73.0102L762.635 36.5563Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M752.577 103.388L815.705 66.9345V77.5669L752.577 114.021V103.388Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M699.507 73.0106L752.576 103.389V114.021L699.507 83.643V73.0106Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M656.334 31.24L700.117 55.1629L686.712 62.3777L642.929 38.4548L656.334 31.24Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M656.334 28.2023L700.118 52.1252L686.713 59.3401L642.929 35.4172L656.334 28.2023Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M686.713 59.3394L700.118 52.1245V58.2002L686.713 65.415V59.3394Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M642.929 35.417L686.712 59.3399V65.4155L642.929 41.4926V35.417Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M688.137 14.8333C689.851 13.844 692.63 13.8455 694.34 14.8366L726.19 33.2931C727.784 34.2168 727.885 35.6917 726.422 36.6851C724.78 37.8004 721.839 37.869 720.046 36.834L688.137 18.4115C686.426 17.4234 686.426 15.8214 688.137 14.8333Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M688.137 11.7956C689.851 10.8062 692.63 10.8077 694.34 11.7989L726.19 30.2554C727.784 31.179 727.885 32.654 726.422 33.6473C724.78 34.7626 721.839 34.8313 720.046 33.7962L688.137 15.3737C686.426 14.3856 686.426 12.7836 688.137 11.7956Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M688.137 15.3735L720.046 33.796V39.8716L688.137 21.4491C687.319 20.9768 686.892 20.3642 686.856 19.7455L686.854 13.5967C686.859 14.2401 687.287 14.8826 688.137 15.3735Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M720.046 33.7964C721.839 34.8315 724.78 34.7629 726.423 33.6476C727.091 33.194 727.432 32.64 727.455 32.0839V38.1595C727.432 38.7156 727.091 39.2697 726.423 39.7233C724.78 40.8385 721.839 40.9072 720.046 39.8721V33.7964Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M673.704 22.922C675.418 21.9327 678.197 21.9341 679.908 22.9253L711.757 41.3818C713.351 42.3055 713.452 43.7804 711.989 44.7738C710.347 45.8891 707.406 45.9577 705.613 44.9226L673.704 26.5001C671.993 25.5121 671.993 23.9101 673.704 22.922Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M673.704 19.8842C675.418 18.8949 678.197 18.8964 679.908 19.8875L711.757 38.3441C713.351 39.2677 713.452 40.7427 711.989 41.736C710.347 42.8513 707.406 42.9199 705.613 41.8849L673.704 23.4624C671.993 22.4743 671.993 20.8723 673.704 19.8842Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M673.704 23.4621L705.613 41.8846V47.9603L673.704 29.5378C672.886 29.0655 672.459 28.4529 672.423 27.8341L672.421 21.6854C672.426 22.3288 672.854 22.9712 673.704 23.4621Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M705.613 41.8852C707.406 42.9203 710.347 42.8516 711.989 41.7363C712.657 41.2827 712.999 40.7287 713.022 40.1726V46.2483C712.999 46.8044 712.657 47.3584 711.989 47.812C710.347 48.9273 707.406 48.9959 705.613 47.9608V41.8852Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M702.564 4.77883C704.278 3.78947 707.057 3.79095 708.767 4.78214L740.617 23.2386C742.211 24.1623 742.312 25.6372 740.849 26.6306C739.207 27.7459 736.265 27.8145 734.473 26.7795L702.564 8.35695C700.853 7.36888 700.853 5.7669 702.564 4.77883Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M702.564 1.74105C704.278 0.751692 707.057 0.753174 708.767 1.74436L740.617 20.2009C742.211 21.1245 742.312 22.5995 740.849 23.5928C739.207 24.7081 736.265 24.7768 734.473 23.7417L702.564 5.31917C700.853 4.3311 700.853 2.72912 702.564 1.74105Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M702.564 5.31902L734.473 23.7415V29.8172L702.564 11.3947C701.746 10.9224 701.319 10.3098 701.283 9.69102L701.28 3.5423C701.286 4.18569 701.714 4.82812 702.564 5.31902Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M734.473 23.742C736.266 24.7771 739.207 24.7084 740.849 23.5932C741.517 23.1395 741.859 22.5855 741.881 22.0294V28.1051C741.859 28.6612 741.517 29.2152 740.849 29.6688C739.207 30.7841 736.266 30.8527 734.473 29.8177V23.742Z"
                      fill="#75DCC0"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M224.044 85.9073L200 99.8765L224.044 113.846L248.087 99.8765L224.044 85.9073Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M224.044 90.9384L200 76.9692V99.8768L224.044 113.846V90.9384Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M248.088 76.9694L224.045 63.0002V85.9078L248.088 99.877V76.9694Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M223.982 90.9384L248.025 76.9692V99.8768L223.982 113.846V90.9384Z"
                      fill="#B382F2"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M248.088 76.9691L224.045 90.9383L212.023 83.9537L200.002 76.9692L224.046 63L236.067 69.9845L248.088 76.9691Z"
                      fill="#8E44EC"
                    />
                    <path
                      d="M236.067 69.9845L248.088 76.9691L224.045 90.9383L212.023 83.9537M236.067 69.9845L212.023 83.9537M236.067 69.9845L224.046 63L200.002 76.9692L212.023 83.9537"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M209.389 82.4259L233.433 68.4567L238.692 71.5124L214.649 85.4816V91.0477L209.389 87.9919V82.4259Z"
                      fill="#E8C7FF"
                    />
                    <path
                      d="M209.389 82.4259L233.433 68.4567L238.692 71.5124L214.649 85.4816M209.389 82.4259V87.9919L214.649 91.0477V85.4816M209.389 82.4259L214.649 85.4816"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M549.044 125.907L525 139.877L549.044 153.846L573.087 139.877L549.044 125.907Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M549.044 130.938L525 116.969V139.877L549.044 153.846V130.938Z"
                      fill="#151515"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M573.088 116.969L549.045 103V125.908L573.088 139.877V116.969Z"
                      fill="#505050"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M548.982 130.938L573.025 116.969V139.877L548.982 153.846V130.938Z"
                      fill="#B382F2"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M573.088 116.969L549.045 130.938L537.023 123.954L525.002 116.969L549.046 103L561.067 109.984L573.088 116.969Z"
                      fill="#8E44EC"
                    />
                    <path
                      d="M561.067 109.984L573.088 116.969L549.045 130.938L537.023 123.954M561.067 109.984L537.023 123.954M561.067 109.984L549.046 103L525.002 116.969L537.023 123.954"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M534.389 122.426L558.433 108.457L563.692 111.512L539.649 125.482V131.048L534.389 127.992V122.426Z"
                      fill="#E8C7FF"
                    />
                    <path
                      d="M534.389 122.426L558.433 108.457L563.692 111.512L539.649 125.482M534.389 122.426V127.992L539.649 131.048V125.482M534.389 122.426L539.649 125.482"
                      stroke="#151515"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-12 lg:gap-6">
          <div className="col-span-12 lg:col-span-6 flex">
            {slice.items.map(
              (item, index) =>
                index === 0 && (
                  // <BorderWrap
                  //   muted
                  //   theme="light"
                  //   className="w-full group"
                  //   innerClassName={clsx(
                  //     "h-full h-full relative overflow-hidden",
                  //     {
                  //       "bg-quaternary-orange": item.highlight === "orange",
                  //       "bg-quaternary-green": item.highlight === "green",
                  //       "bg-quaternary-blue": item.highlight === "blue",
                  //       "bg-quaternary-purple": item.highlight === "purple",
                  //       "bg-quaternary-pink": item.highlight === "pink",
                  //       "bg-gray-F7":
                  //         item.highlight === "none" || !item.highlight
                  //     }
                  //   )}
                  // >
                  //   <div className="relative z-10 gap-8 flex flex-col h-[calc(100%-1px)] overflow-hidden">
                  //     <div className="px-8 lg:px-12 pt-8 lg:pt-12 flex flex-col gap-4 transition-all origin-bottom group-hover:scale-95 group-hover:opacity-50">
                  //       <Eyebrow color={item.eyebrow_color} className="mb-0">
                  //         {item.eyebrow}
                  //       </Eyebrow>
                  //       <PrismicNextLink
                  //         field={item.link}
                  //         className="after:absolute after:inset-0"
                  //       >
                  //         <Heading
                  //           field={item.heading}
                  //           size="lg"
                  //           className="max-w-[38rem]"
                  //           balance={false}
                  //         />
                  //       </PrismicNextLink>
                  //       <Copy
                  //         field={item.subheading}
                  //         muted
                  //         theme="light"
                  //         className="max-w-[32rem]"
                  //       />
                  //     </div>
                  //     <PrismicNextLink field={item.link} className="grow">
                  //       <div className="pl-8 lg:pl-12 pr-px pb-px grow transition-all group-hover:-translate-y-12">
                  //         <div className="-mb-16 lg:-mb-32 relative">
                  //           <PrismicNextImage
                  //             field={item.image}
                  //             className="w-full h-full object-cover object-left-top"
                  //             style={{
                  //               boxShadow:
                  //                 item.highlight === "orange"
                  //                   ? "0px 12px 19px rgba(237, 107, 34, 0.12)"
                  //                   : item.highlight === "green"
                  //                     ? "0px 12px 19px rgba(59, 187, 150, 0.12)"
                  //                     : item.highlight === "blue"
                  //                       ? "0px 12px 19px rgba(89, 181, 248, 0.12)"
                  //                       : item.highlight === "purple"
                  //                         ? "0px 12px 19px rgba(142, 68, 236, 0.12)"
                  //                         : item.highlight === "pink"
                  //                           ? "0px 12px 19px rgba(249, 114, 137, 0.12)"
                  //                           : "0px 12px 19px rgba(0, 0, 0, 0.08)"
                  //             }}
                  //           />
                  //         </div>
                  //       </div>
                  //     </PrismicNextLink>
                  //   </div>
                  //   <svg
                  //     viewBox="0 0 594 624"
                  //     fill="none"
                  //     xmlns="http://www.w3.org/2000/svg"
                  //     className={clsx(
                  //       "absolute top-0 right-12 w-[calc(100%-48px)] h-auto",
                  //       {
                  //         "text-tertiary-orange": item.highlight === "orange",
                  //         "text-tertiary-green": item.highlight === "green",
                  //         "text-tertiary-blue": item.highlight === "blue",
                  //         "text-tertiary-purple": item.highlight === "purple",
                  //         "text-tertiary-pink": item.highlight === "pink",
                  //         hidden: item.highlight === "none" || !item.highlight
                  //       }
                  //     )}
                  //   >
                  //     <path
                  //       d="M-70.9191 570.935C-25.8873 606.051 75.5262 646.967 171.448 587.613C277.817 521.795 370.73 340.594 282.27 225.606C205.143 125.35 68.5786 224.175 93.1331 339.205C117.688 454.236 228.529 480.498 304.37 461.175C546.357 399.521 629.387 75.6119 567.941 -36.7606"
                  //       stroke="currentColor"
                  //       strokeWidth="12"
                  //     />
                  //   </svg>
                  // </BorderWrap>
                  <BentoCard key={index} item={item} index={index} />
                )
            )}
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col sm:flex-row lg:flex-col gap-6 mt-6 lg:mt-0">
            {slice.items.map(
              (item, index) =>
                index !== 0 && (
                  // <BorderWrap
                  //   theme="light"
                  //   muted
                  //   className="grow group"
                  //   innerClassName={clsx("h-full relative overflow-hidden", {
                  //     "bg-quaternary-orange": item.highlight === "orange",
                  //     "bg-quaternary-green": item.highlight === "green",
                  //     "bg-quaternary-blue": item.highlight === "blue",
                  //     "bg-quaternary-purple": item.highlight === "purple",
                  //     "bg-quaternary-pink": item.highlight === "pink",
                  //     "bg-gray-F7": item.highlight === "none" || !item.highlight
                  //   })}
                  // >
                  //   <div className="relative z-10 gap-6 flex flex-col h-[calc(100%-1px)] overflow-hidden">
                  //     <div className="px-8 lg:px-12 pt-8 lg:pt-12 flex flex-col gap-4 transition-all origin-bottom group-hover:scale-95 group-hover:opacity-50">
                  //       <PrismicNextLink
                  //         field={item.link}
                  //         className="after:absolute after:inset-0"
                  //       >
                  //         <Heading
                  //           field={item.heading}
                  //           size="lg"
                  //           balance={false}
                  //         />
                  //       </PrismicNextLink>
                  //       <Copy field={item.subheading} muted theme="light" />
                  //     </div>
                  //     <PrismicNextLink field={item.link} className="grow">
                  //       <div className="px-8 lg:px-12 z-30 mb-px transition-all group-hover:-translate-y-12">
                  //         <div className="-mb-16 lg:-mb-32">
                  //           <PrismicNextImage
                  //             field={item.image}
                  //             className="h-full w-full object-fill object-top"
                  //             style={{
                  //               boxShadow:
                  //                 item.highlight === "orange"
                  //                   ? "0px 10px 4px rgba(237, 107, 34, 0.12)"
                  //                   : item.highlight === "green"
                  //                     ? "0px 10px 4px rgba(59, 187, 150, 0.12)"
                  //                     : item.highlight === "blue"
                  //                       ? "0px 10px 4px rgba(89, 181, 248, 0.12)"
                  //                       : item.highlight === "purple"
                  //                         ? "0px 10px 4px rgba(142, 68, 236, 0.12)"
                  //                         : item.highlight === "pink"
                  //                           ? "0px 10px 4px rgba(249, 114, 137, 0.12)"
                  //                           : "0px 10px 4px rgba(0, 0, 0, 0.08)"
                  //             }}
                  //           />
                  //         </div>
                  //       </div>
                  //     </PrismicNextLink>
                  //   </div>
                  //   <svg
                  //     viewBox="0 0 594 624"
                  //     fill="none"
                  //     xmlns="http://www.w3.org/2000/svg"
                  //     className={clsx(
                  //       "absolute top-0 right-12 w-[calc(100%-48px)] h-auto",
                  //       {
                  //         "text-tertiary-orange": item.highlight === "orange",
                  //         "text-tertiary-green": item.highlight === "green",
                  //         "text-tertiary-blue": item.highlight === "blue",
                  //         "text-tertiary-purple": item.highlight === "purple",
                  //         "text-tertiary-pink": item.highlight === "pink",
                  //         hidden: item.highlight === "none" || !item.highlight
                  //       }
                  //     )}
                  //   >
                  //     <path
                  //       d="M-70.9191 570.935C-25.8873 606.051 75.5262 646.967 171.448 587.613C277.817 521.795 370.73 340.594 282.27 225.606C205.143 125.35 68.5786 224.175 93.1331 339.205C117.688 454.236 228.529 480.498 304.37 461.175C546.357 399.521 629.387 75.6119 567.941 -36.7606"
                  //       stroke="currentColor"
                  //       strokeWidth="12"
                  //     />
                  //   </svg>
                  // </BorderWrap>
                  <BentoCard key={index} item={item} index={index} />
                )
            )}
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default HeroDefault;
