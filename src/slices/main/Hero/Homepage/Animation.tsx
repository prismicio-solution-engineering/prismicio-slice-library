"use client";

import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { BorderWrap } from "@/components/ui/BorderWrap";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type AnimationProps = {
  slice: Content.MainHeroSliceHomepage;
  theme: SliceZoneContext["theme"];
};

export const Animation = ({ slice, theme }: AnimationProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [sliceYEndPos, setSliceYEndPos] = useState(0);
  const [sliceAnimationComplete, setSliceAnimationComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const desktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const { scrollYProgress } = useScroll({
    offset: ["start start", "start -250px"]
  });

  const videoInView = useInView(videoRef, {
    amount: 1
  });

  useEffect(() => {
    if (!desktop && videoInView) {
      videoRef.current?.play();
    }
  }, [videoInView, desktop]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!videoRef.current || !desktop) return;

    if (latest >= 1) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 500);
    } else if (latest <= 0.8) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20
  });

  const sliceXPos = useTransform(scrollSpring, [0, 0.9], [0, -642]);
  const sliceYPos = useTransform(scrollSpring, [0, 0.9], [0, sliceYEndPos]);
  const fadeOut = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const sliceDropScale = useSpring(
    useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.5])
  );

  useMotionValueEvent(sliceDropScale, "change", (latest) => {
    if (latest <= 0.5) {
      setSliceAnimationComplete(true);
    }
    if (latest >= 1) {
      setSliceAnimationComplete(false);
    }
  });

  useEffect(() => {
    const updateVideoCenter = () => {
      if (videoRef.current && svgRef.current) {
        const videoRect = videoRef.current.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();
        const videoCenter = videoRect.top + videoRect.height / 2;
        const videoCenterRelativeToSVG = videoCenter - svgRect.top;

        const svgViewBoxHeight = svgRef.current.viewBox.animVal.height;

        const videoCenterInSVGCoordinates =
          (videoCenterRelativeToSVG / svgRect.height) * svgViewBoxHeight;

        setSliceYEndPos(videoCenterInSVGCoordinates - 444);
      }
    };

    updateVideoCenter();

    window.addEventListener("resize", updateVideoCenter);

    return () => {
      window.removeEventListener("resize", updateVideoCenter);
    };
  }, [svgRef, videoRef]);

  const animateIn = (
    direction: "left" | "right",
    duration: number,
    delay: number
  ) => ({
    from: {
      x: direction === "left" ? -500 : 500,
      opacity: 0
    },
    to: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay
      }
    },
    toOffset: {
      x: 100,
      opacity: 1,
      transition: {
        duration,
        delay
      }
    }
  });

  const cursorIn = (delay: number) => ({
    from: {
      y: 100,
      opacity: 0
    },
    to: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay
      }
    }
  });

  const lineGrowIn = (y: number, x: number, delay: number) => ({
    from: {
      x,
      y,
      opacity: 0
    },
    to: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay
      }
    }
  });

  const linePulse = (
    delay: number,
    repeatDelay: number = 1,
    pathLength: number,
    reverse?: boolean
  ) => ({
    from: { strokeDashoffset: pathLength, strokeDasharray: pathLength },
    to: {
      strokeDashoffset: reverse
        ? [pathLength, pathLength * 2, pathLength * 3]
        : [pathLength * 3, pathLength * 2, pathLength],
      strokeDasharray: pathLength,
      transition: {
        strokeDashoffset: {
          duration: 0.5,
          repeat: Infinity,
          delay,
          repeatDelay
        }
      }
    }
  });

  const changeColor = (color: string, delay: number) => ({
    to: {
      fill: color,
      transition: {
        duration: 0.25,
        delay
      }
    }
  });

  const popIn = (delay: number) => ({
    from: {
      y: 10,
      opacity: 0
    },
    to: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  });

  return (
    <div>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="1440"
        fill="none"
        viewBox="0 0 1440 1440"
        className="w-full h-auto absolute top-0 z-10 pointer-events-none hidden lg:block"
        ref={svgRef}
        animate={{
          opacity: sliceAnimationComplete ? 0 : 1,
          transition: { duration: 0.25, delay: 0.25 }
        }}
      >
        <motion.g id="pulseLines" style={{ opacity: fadeOut }}>
          <motion.g
            id="line4"
            strokeLinecap="round"
            variants={lineGrowIn(35, -60, 4)}
            initial="from"
            animate="to"
          >
            <path
              stroke="#FEF1E9"
              strokeWidth="10"
              d="M145 162.5l59.756-34.5"
            ></path>
            <motion.path
              stroke="#ED6B22"
              strokeWidth="4"
              d="M145 162.5l59.756-34.5"
              variants={linePulse(8, 1, 70, true)}
              initial="from"
              animate="to"
            ></motion.path>
          </motion.g>
          <motion.g
            id="line3"
            strokeLinecap="round"
            variants={lineGrowIn(55, 95, 4)}
            initial="from"
            animate="to"
          >
            <path
              stroke="#FEF1E9"
              strokeWidth="10"
              d="M1128 50l94.4 54.5"
            ></path>
            <motion.path
              stroke="#ED6B22"
              strokeWidth="4"
              d="M1128 50l94.4 54.5"
              variants={linePulse(7, 1, 109, true)}
              initial="from"
              animate="to"
            ></motion.path>
          </motion.g>
          <motion.g
            id="line2"
            strokeLinecap="round"
            variants={lineGrowIn(55, 95, 4)}
            initial="from"
            animate="to"
          >
            <path
              stroke="#F5E6FF"
              strokeWidth="10"
              d="M1214 362l94.4 54.5"
            ></path>
            <motion.path
              stroke="#8E44EC"
              strokeWidth="4"
              d="M1214 362l94.4 54.5"
              variants={linePulse(6, 1, 95)}
              initial="from"
              animate="to"
            ></motion.path>
          </motion.g>
          <motion.g
            id="line1"
            strokeLinecap="round"
            variants={lineGrowIn(-35, 60, 4)}
            initial="from"
            animate="to"
          >
            <path
              stroke="#F5E6FF"
              strokeWidth="10"
              d="M1216 224.5l59.76-34.5"
            ></path>
            <motion.path
              stroke="#8E44EC"
              strokeWidth="4"
              d="M1216 224.5l59.76-34.5M1216 224.5l17.32-10"
              variants={linePulse(5, 1, 69, true)}
              initial="from"
              animate="to"
            ></motion.path>
          </motion.g>
        </motion.g>
        <motion.g
          style={{
            x: cursorVisible ? sliceXPos : 0,
            y: cursorVisible ? sliceYPos : 0
          }}
          id="purpleSlice"
          variants={animateIn("right", 1, 2.6)}
          initial="from"
          animate="to"
        >
          <motion.g
            style={{
              scale: cursorVisible ? sliceDropScale : 1
            }}
          >
            <path
              id="purpleSliceShadow"
              fill="#151515"
              d="M1264 456.491l121.08 69.679 74.27-42.491L1338.28 414 1264 456.491z"
              opacity="0.15"
            ></path>
            <motion.path
              id="purpleSliceTop"
              fill="#EEEEEE"
              stroke="#151515"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1264 426.491l121.08 69.679 74.27-42.491L1338.28 384 1264 426.491z"
              variants={changeColor("#8E44EC", 6.5)}
              initial="from"
              animate="to"
            ></motion.path>
            <motion.path
              id="purpleSliceShort"
              fill="#FFFFFF"
              stroke="#151515"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1385.08 514.103v-17.934l74.27-42.491v17.934l-74.27 42.491z"
              variants={changeColor("#B382F2", 6.5)}
              initial="from"
              animate="to"
            ></motion.path>
            <path
              id="purpleSliceLong"
              fill="#151515"
              stroke="#151515"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1264 426.491l121.08 69.679v17.933L1264 444.424v-17.933z"
            ></path>
            <g id="purpleSliceIntruded" stroke="#151515" strokeWidth="2">
              <g id="purpleSliceSmall3Intruded">
                <path
                  fill="#505050"
                  d="M1370.87 414.421c1.44-.829 3.77-.828 5.2.002l26.67 15.455c1.33.774 1.42 2.009.19 2.841-1.37.934-3.83.991-5.34.124l-26.72-15.426c-1.43-.828-1.43-2.169 0-2.996z"
                ></path>
                <path
                  fill="#151515"
                  strokeLinejoin="round"
                  d="M1402.74 432.422l-26.67-15.455v-2.544l26.67 15.455c1.29.747 1.41 1.924.31 2.753a3.04 3.04 0 00-.31-.209z"
                ></path>
                <path
                  fill="#fff"
                  strokeLinejoin="round"
                  d="M1376.07 414.423c-1.43-.83-3.76-.831-5.2-.002-1.3.755-1.42 1.94-.34 2.77a4.9 4.9 0 01.34-.227c1.44-.828 3.77-.827 5.2.003v-2.544z"
                ></path>
              </g>
              <g id="purpleSliceSmall2Intruded">
                <path
                  fill="#505050"
                  d="M1338.11 407.623c1.44-.831 3.77-.831 5.21.001l68.28 39.485c1.24.717 1.42 1.842.42 2.677-1.29 1.086-3.97 1.229-5.58.298l-68.33-39.453c-1.44-.831-1.44-2.177 0-3.008z"
                ></path>
                <path
                  fill="#151515"
                  strokeLinejoin="round"
                  d="M1411.6 449.661l-68.28-39.485v-2.552l68.28 39.484c1.24.717 1.41 1.843.42 2.678a.837.837 0 01-.11.085c-.09-.073-.2-.143-.31-.21z"
                ></path>
                <path
                  fill="#fff"
                  strokeLinejoin="round"
                  d="M1343.32 407.624c-1.44-.832-3.77-.832-5.21-.001-1.32.758-1.43 1.947-.35 2.78.11-.079.22-.155.35-.228 1.44-.831 3.77-.83 5.21.001v-2.552z"
                ></path>
              </g>
              <g id="purpleSliceSmall1Intruded">
                <path
                  fill="#505050"
                  d="M1340.48 418.925c1.45-.834 3.79-.833 5.24.002l49.71 28.767c1.29.746 1.43 1.927.33 2.768-1.34 1.022-3.93 1.126-5.5.219l-49.78-28.736c-1.44-.834-1.44-2.186 0-3.02z"
                ></path>
                <path
                  fill="#151515"
                  strokeLinejoin="round"
                  d="M1395.43 450.257l-49.72-28.767v-2.563l49.72 28.767c1.29.746 1.43 1.927.33 2.768l-.01.006c-.09-.073-.2-.144-.32-.211z"
                ></path>
                <path
                  fill="#fff"
                  strokeLinejoin="round"
                  d="M1345.72 418.927c-1.45-.835-3.79-.836-5.24-.002-1.32.762-1.43 1.955-.34 2.792.1-.08.22-.156.34-.229 1.45-.834 3.79-.834 5.24.002v-2.563z"
                ></path>
              </g>
              <g id="purpleSliceLargeIntruded" strokeLinejoin="round">
                <path
                  fill="#505050"
                  d="M1279 426.49l106.27 60.832 26.61-15.368-106.27-60.832L1279 426.49z"
                ></path>
                <path
                  fill="#fff"
                  d="M1284.57 429.678l-5.57-3.188 26.61-15.368v6.403l-21.04 12.153z"
                ></path>
                <path
                  fill="#151515"
                  d="M1305.61 411.122l106.27 60.832-5.57 3.216-100.7-57.645v-6.403z"
                ></path>
              </g>
            </g>
            <g id="purpleSliceExtruded">
              <motion.g
                id="purpleSliceSmall3Extruded"
                stroke="#151515"
                strokeWidth="2"
                variants={popIn(6.5)}
                initial="from"
                animate="to"
              >
                <path
                  fill="#B382F2"
                  d="M1370.75 414.12c1.44-.83 3.78-.829 5.22.003l26.79 15.496c1.35.776 1.43 2.014.2 2.848-1.38.937-3.86.994-5.36.125l-26.85-15.468c-1.44-.829-1.44-2.174 0-3.004z"
                ></path>
                <path
                  fill="#B382F2"
                  d="M1370.75 411.57c1.44-.831 3.78-.83 5.22.002l26.79 15.497c1.35.775 1.43 2.014.2 2.848-1.38.936-3.86.994-5.36.125l-26.85-15.468c-1.44-.83-1.44-2.175 0-3.004z"
                ></path>
                <path
                  fill="#151515"
                  strokeLinejoin="round"
                  d="M1370.75 414.574l26.85 15.468v2.55l-26.85-15.467c-.71-.411-1.07-.948-1.08-1.486v-2.559c.01.541.37 1.081 1.08 1.494z"
                ></path>
                <path
                  fill="#B382F2"
                  strokeLinejoin="round"
                  d="M1397.59 430.042c1.51.869 3.99.812 5.37-.125.58-.393.87-.877.87-1.36v2.551c0 .482-.29.966-.87 1.36-1.38.936-3.86.994-5.37.125v-2.551z"
                ></path>
              </motion.g>
              <motion.g
                id="purpleSliceSmall2Extruded"
                variants={popIn(6.6)}
                initial="from"
                animate="to"
              >
                <path
                  fill="#B382F2"
                  stroke="#151515"
                  strokeWidth="1.5"
                  d="M1338.17 407.743c1.44-.831 3.77-.83 5.21.001l68.37 39.458c1.24.716 1.42 1.84.43 2.675-1.29 1.085-3.98 1.228-5.59.298l-68.42-39.427c-1.44-.83-1.44-2.175 0-3.005z"
                ></path>
                <path
                  fill="#B382F2"
                  stroke="#151515"
                  strokeWidth="1.5"
                  d="M1338.17 405.192c1.44-.83 3.77-.83 5.21.001l68.37 39.458c1.24.717 1.42 1.841.43 2.676-1.29 1.085-3.98 1.227-5.59.297l-68.42-39.426c-1.44-.83-1.44-2.176 0-3.006z"
                ></path>
                <path
                  fill="#151515"
                  d="M1338.17 408.198l68.42 39.426v2.551l-68.42-39.426c-.74-.422-1.1-.978-1.08-1.531v-2.553.061c.01.533.37 1.065 1.08 1.472z"
                ></path>
                <path
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1338.17 408.198l68.42 39.426v2.551l-68.42-39.426c-.74-.422-1.1-.978-1.08-1.531v-2.553c-.02.554.34 1.111 1.08 1.533z"
                ></path>
                <path
                  fill="#B382F2"
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M1406.59 447.624c1.61.93 4.3.787 5.59-.298.42-.349.63-.75.64-1.149v2.472c.01.426-.2.856-.64 1.228-1.29 1.085-3.98 1.228-5.59.297v-2.55z"
                ></path>
              </motion.g>
              <motion.g
                id="purpleSliceSmall1Extruded"
                variants={popIn(6.7)}
                initial="from"
                animate="to"
              >
                <path
                  fill="#B382F2"
                  stroke="#151515"
                  strokeWidth="2"
                  d="M1340.6 418.791c1.45-.831 3.78-.83 5.22.002l49.59 28.632c1.28.743 1.42 1.918.32 2.754-1.33 1.018-3.92 1.121-5.49.219l-49.64-28.602c-1.44-.829-1.44-2.175 0-3.005z"
                ></path>
                <path
                  fill="#B382F2"
                  stroke="#151515"
                  strokeWidth="2"
                  d="M1340.6 416.24c1.45-.83 3.78-.829 5.22.002l49.59 28.632c1.28.743 1.42 1.918.32 2.755-1.33 1.018-3.92 1.121-5.49.218l-49.64-28.601c-1.44-.83-1.44-2.176 0-3.006z"
                ></path>
                <path
                  fill="#151515"
                  d="M1340.6 419.246l49.64 28.601v2.551l-49.64-28.602c-.73-.422-1.09-.977-1.08-1.53v-2.55.054c.02.535.38 1.068 1.08 1.476z"
                ></path>
                <path
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1340.6 419.246l49.64 28.601v2.551l-49.64-28.602c-.73-.422-1.09-.977-1.08-1.53v-2.55c-.01.553.35 1.108 1.08 1.53z"
                ></path>
                <path
                  fill="#B382F2"
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1390.24 447.847c1.57.902 4.16.8 5.49-.218.48-.364.72-.791.74-1.219v2.551c-.02.428-.26.855-.74 1.218-1.33 1.018-3.92 1.121-5.49.218v-2.55z"
                ></path>
              </motion.g>
              <motion.g
                id="purpleSliceLargeExtruded"
                stroke="#151515"
                strokeLinejoin="round"
                variants={popIn(6.8)}
                initial="from"
                animate="to"
              >
                <path
                  fill="#B382F2"
                  strokeWidth="1.5"
                  d="M1279.34 426.644l106.03 60.577 26.55-15.304-106.03-60.577-26.55 15.304z"
                ></path>
                <path
                  fill="#B382F2"
                  strokeWidth="1.5"
                  d="M1279.34 424.093l106.03 60.577 26.55-15.303-106.03-60.577-26.55 15.303zm132.58 45.274l-26.55 15.303v2.551l26.55-15.304v-2.55z"
                ></path>
                <path
                  fill="#151515"
                  strokeWidth="2"
                  d="M1279.34 424.093l106.03 60.577v2.551l-106.03-60.577v-2.551z"
                ></path>
              </motion.g>
            </g>
          </motion.g>
          <motion.g
            id="devCursor"
            variants={cursorIn(7)}
            initial="from"
            animate="to"
            onAnimationComplete={() => {
              setCursorVisible(true);
            }}
          >
            <path
              id="Vector_12"
              d="M1312.93 486.394L1325.54 473.789C1325.97 473.354 1326.68 473.354 1327.11 473.789C1327.31 473.982 1327.42 474.237 1327.44 474.513L1328.47 492.105C1328.49 492.408 1328.38 492.704 1328.16 492.918C1327.75 493.333 1327.08 493.333 1326.66 492.918L1322.41 488.672C1321.79 488.044 1320.92 487.718 1320.03 487.777L1313.75 488.199C1313.44 488.22 1313.14 488.104 1312.93 487.89C1312.52 487.479 1312.52 486.809 1312.93 486.394Z"
              fill="#151515"
              stroke="#151515"
            />
            <path
              id="Vector_13"
              d="M1310.93 484.394L1323.54 471.789C1323.97 471.354 1324.68 471.354 1325.11 471.789C1325.31 471.982 1325.42 472.237 1325.44 472.513L1326.47 490.105C1326.49 490.408 1326.38 490.704 1326.16 490.918C1325.75 491.333 1325.08 491.333 1324.66 490.918L1320.41 486.672C1319.79 486.044 1318.92 485.718 1318.03 485.777L1311.75 486.199C1311.44 486.22 1311.14 486.104 1310.93 485.89C1310.52 485.479 1310.52 484.809 1310.93 484.394Z"
              fill="#ED6B22"
              stroke="#151515"
            />
            <g id="Frame 1400001129">
              <rect
                x="1236"
                y="495.51"
                width="84"
                height="26"
                rx="2"
                fill="#151515"
              />
              <rect
                x="1236"
                y="495.51"
                width="84"
                height="26"
                rx="2"
                stroke="#151515"
              />
            </g>
            <g id="Frame 1400001128">
              <rect
                x="1234"
                y="493.51"
                width="84"
                height="26"
                rx="2"
                fill="#ED6B22"
              />
              <path
                id="item-description"
                d="M1248.52 511.51H1245.18V501.388H1248.47C1251.49 501.388 1253.53 503.432 1253.53 506.456C1253.53 509.466 1251.52 511.51 1248.52 511.51ZM1248.37 502.648H1246.55V510.236H1248.42C1250.68 510.236 1252.11 508.78 1252.11 506.456C1252.11 504.104 1250.68 502.648 1248.37 502.648ZM1257.87 511.678C1255.85 511.678 1254.47 510.222 1254.47 508.094C1254.47 505.952 1255.83 504.468 1257.81 504.468C1259.76 504.468 1261.03 505.812 1261.03 507.842V508.332L1255.74 508.346C1255.84 509.788 1256.6 510.586 1257.9 510.586C1258.92 510.586 1259.59 510.166 1259.82 509.382H1261.05C1260.71 510.852 1259.56 511.678 1257.87 511.678ZM1257.81 505.574C1256.67 505.574 1255.94 506.26 1255.77 507.464H1259.72C1259.72 506.33 1258.98 505.574 1257.81 505.574ZM1264.05 511.51L1261.29 504.664H1262.69L1264.19 508.486C1264.43 509.13 1264.62 509.704 1264.73 510.124C1264.85 509.676 1265.07 509.088 1265.31 508.486L1266.83 504.664H1268.21L1265.35 511.51H1264.05ZM1271.75 511.678C1269.74 511.678 1268.35 510.222 1268.35 508.094C1268.35 505.952 1269.71 504.468 1271.7 504.468C1273.64 504.468 1274.92 505.812 1274.92 507.842V508.332L1269.63 508.346C1269.72 509.788 1270.48 510.586 1271.78 510.586C1272.8 510.586 1273.48 510.166 1273.7 509.382H1274.93C1274.6 510.852 1273.45 511.678 1271.75 511.678ZM1271.7 505.574C1270.55 505.574 1269.82 506.26 1269.65 507.464H1273.6C1273.6 506.33 1272.86 505.574 1271.7 505.574ZM1277.59 511.51H1276.28V501.206H1277.59V511.51ZM1278.94 508.08C1278.94 505.966 1280.45 504.482 1282.51 504.482C1284.55 504.482 1286.07 505.966 1286.07 508.08C1286.07 510.194 1284.55 511.678 1282.51 511.678C1280.45 511.678 1278.94 510.194 1278.94 508.08ZM1280.27 508.08C1280.27 509.508 1281.18 510.502 1282.51 510.502C1283.83 510.502 1284.75 509.508 1284.75 508.08C1284.75 506.652 1283.83 505.658 1282.51 505.658C1281.18 505.658 1280.27 506.652 1280.27 508.08ZM1287.38 514.576V504.664H1288.57L1288.67 505.896C1289.13 504.958 1290.06 504.468 1291.15 504.468C1293.11 504.468 1294.33 505.938 1294.33 508.038C1294.33 510.124 1293.18 511.692 1291.15 511.692C1290.06 511.692 1289.15 511.23 1288.7 510.39V514.576H1287.38ZM1288.71 508.094C1288.71 509.494 1289.53 510.502 1290.87 510.502C1292.21 510.502 1293.01 509.494 1293.01 508.094C1293.01 506.68 1292.21 505.672 1290.87 505.672C1289.53 505.672 1288.71 506.666 1288.71 508.094ZM1298.59 511.678C1296.58 511.678 1295.19 510.222 1295.19 508.094C1295.19 505.952 1296.55 504.468 1298.54 504.468C1300.48 504.468 1301.76 505.812 1301.76 507.842V508.332L1296.46 508.346C1296.56 509.788 1297.32 510.586 1298.62 510.586C1299.64 510.586 1300.31 510.166 1300.54 509.382H1301.77C1301.43 510.852 1300.29 511.678 1298.59 511.678ZM1298.54 505.574C1297.39 505.574 1296.66 506.26 1296.49 507.464H1300.44C1300.44 506.33 1299.7 505.574 1298.54 505.574ZM1307.01 504.608V505.812H1306.42C1305.17 505.812 1304.4 506.568 1304.4 507.884V511.51H1303.09V504.678H1304.32L1304.4 505.714C1304.68 505 1305.37 504.524 1306.31 504.524C1306.54 504.524 1306.74 504.552 1307.01 504.608Z"
                fill="white"
              />
              <rect
                x="1234"
                y="493.51"
                width="84"
                height="26"
                rx="2"
                stroke="#151515"
              />
            </g>
          </motion.g>
        </motion.g>
        <motion.g
          id="blueCurly"
          variants={animateIn("right", 1, 2.7)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            d="M1245.66 325.843c2.94 1.699 6.82 2.783 12.59-.543l8.2-4.735c6.45-3.724 14.15-3.398 21.79 1.012l4.76 2.747-6.7 3.868-4.26-2.458c-2.06-1.193-4.95-1.265-7.07-.036l-8.02 4.627c-6.2 3.579-11.27 3.688-17.28 1.374 4.07 3.434 3.88 6.363-2.45 10.014l-7.89 4.555c-2.12 1.229-2 2.892.07 4.085l4.26 2.458-6.7 3.868-4.76-2.747c-7.64-4.411-8.21-8.857-1.76-12.581l8.08-4.663c5.89-3.398 4.01-5.64 1.07-7.339l-.94-.542 6.07-3.507.94.543z"
            opacity="0.15"
          ></path>
          <path
            fill="#151515"
            d="M1245.66 319.683c2.94 1.699 6.82 2.783 12.59-.543l8.2-4.735c6.45-3.724 14.15-3.399 21.79 1.012l4.76 2.747-6.7 3.868-4.26-2.458c-2.06-1.193-4.95-1.265-7.07-.036l-8.02 4.627c-6.2 3.579-11.27 3.688-17.28 1.374 4.07 3.434 3.88 6.362-2.45 10.014l-7.89 4.555c-2.12 1.229-2 2.892.07 4.085l4.26 2.458-6.7 3.868-4.76-2.747c-7.64-4.411-8.21-8.857-1.76-12.581l8.08-4.663c5.89-3.398 4.01-5.64 1.07-7.339l-.94-.542 6.07-3.507.94.543z"
          ></path>
          <path
            fill="#151515"
            d="M1258.25 305.3c-5.77 3.326-9.65 2.242-12.59.543l-.94-.543-6.07 3.507v7.808c-.05.024-.09.049-.13.073l-8.08 4.663c-3.06 1.767-4.54 3.696-4.43 5.707v13.837c.11 2.228 2.17 4.556 6.19 6.874l4.76 2.747v-13.837l-4.55-2.625 6.11-3.529c5.89-3.398 4.01-5.639 1.07-7.339l-.94-.542 6.07-3.506.94.542c2.94 1.699 6.82 2.783 12.59-.542l8.2-4.736c6.45-3.724 14.15-3.398 21.79 1.012l4.76 2.748v-13.838l-4.76-2.747c-7.64-4.41-15.34-4.736-21.79-1.012l-8.2 4.735z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="1.5"
            d="M1238.65 308.807l.94.542c2.94 1.699 4.82 3.941-1.07 7.339l-8.08 4.663c-3.06 1.767-4.54 3.696-4.43 5.707m12.64-18.251l6.07-3.507.94.543c2.94 1.699 6.82 2.783 12.59-.543l8.2-4.735c6.45-3.724 14.15-3.398 21.79 1.012l4.76 2.747v13.838l-4.76-2.748c-7.64-4.41-15.34-4.736-21.79-1.012l-8.2 4.736c-5.77 3.325-9.65 2.241-12.59.542l-.94-.542-6.07 3.506m0-13.837v13.837m0 0l.94.542c2.94 1.7 4.82 3.941-1.07 7.339l-6.11 3.529m-6.4-6.996c.11 2.228 2.17 4.556 6.19 6.874l.21.122m-6.4-6.996v13.837c.11 2.228 2.17 4.556 6.19 6.874l4.76 2.747v-13.837l-4.55-2.625"
          ></path>
          <path
            fill="#59B5F8"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1245.66 305.843c2.94 1.699 6.82 2.783 12.59-.543l8.2-4.735c6.45-3.724 14.15-3.398 21.79 1.012l4.76 2.747-6.7 3.868-4.26-2.458c-2.06-1.193-4.95-1.265-7.07-.036l-8.02 4.627c-6.2 3.579-11.27 3.688-17.28 1.374 4.07 3.434 3.88 6.363-2.45 10.014l-7.89 4.555c-2.12 1.229-2 2.892.07 4.085l4.26 2.458-6.7 3.868-4.76-2.747c-7.64-4.411-8.21-8.857-1.76-12.581l8.08-4.663c5.89-3.398 4.01-5.64 1.07-7.339l-.94-.542 6.07-3.507.94.543z"
          ></path>
          <path
            fill="#87D9FD"
            d="M1286.3 322.03l6.7-3.869v-13.837l-6.7 3.868-4.26-2.458c-2.06-1.193-4.95-1.265-7.07-.036l-8.02 4.627c-6.2 3.579-11.27 3.688-17.28 1.374 3.46 2.918 3.84 5.471 0 8.412-.68.52-1.49 1.053-2.45 1.602l-7.89 4.555c-2.12 1.229-2 2.892.07 4.085l4.26 2.458-6.7 3.868v13.837l6.7-3.868v-9.038l3.56-2.06c6.33-3.651 6.52-6.58 2.45-10.014 6.01 2.314 11.08 2.205 17.28-1.374l8.02-4.627c2.12-1.229 5.01-1.157 7.07.036l4.26 2.459z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="1.5"
            d="M1286.3 322.03l6.7-3.869v-13.837l-6.7 3.868m0 13.838l-4.26-2.459c-2.06-1.193-4.95-1.265-7.07-.036l-8.02 4.627c-6.2 3.579-11.27 3.688-17.28 1.374m36.63-3.506v-13.838m-36.63 17.344c4.07 3.434 3.88 6.363-2.45 10.014l-3.56 2.06m6.01-12.074v-5.425m36.63-11.919l-4.26-2.458c-2.06-1.193-4.95-1.265-7.07-.036l-8.02 4.627c-6.2 3.579-11.27 3.688-17.28 1.374 3.46 2.918 3.84 5.471 0 8.412m-6.01 12.7l-4.26-2.458c-2.07-1.193-2.19-2.856-.07-4.085l7.89-4.555c.96-.549 1.77-1.082 2.45-1.602m-6.01 12.7l-6.7 3.868v13.837l6.7-3.868v-9.038m0-4.799v4.799"
          ></path>
          <path
            fill="#87D9FD"
            d="M1252.41 316.708c0 2.716.15 9.807-.15 13.126-.75 2.867-2.61 3.923-3.32 4.225 0 0-3.77-10.561-1.36-12.221 2.42-1.66 2.87-1.961 3.93-3.018 1.05-1.056.45-1.056.9-2.112z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="2"
            d="M1265.09 325.006v-13.578"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="1.5"
            d="M1254.98 326.666v-13.579m-5.43 20.821v-13.579m2.72 10.863v-14.484"
          ></path>
        </motion.g>
        <motion.g
          id="playSlice"
          variants={animateIn("right", 1, 2.5)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            d="M1343 322.586l121.08 69.678 44.72-25.585L1387.72 297 1343 322.586z"
            opacity="0.15"
          ></path>
          <path
            d="M1464.07812 380.1972V362.2639L1509.8022 336.678223V354.6117L1464.07812 380.1972Z"
            fill="#F39A68"
            stroke="#151515"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fill="#ED6B22"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1343 292.586l121.08 69.678 44.72-25.585L1387.72 267 1343 292.586z"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1343 292.586l121.08 69.679v17.933L1343 310.519v-17.933z"
          ></path>
          <g stroke="#151515" strokeLinejoin="round" strokeWidth="1.5">
            <path
              fill="#F39A68"
              d="M1460.28 349.238l-27.48-15.872 27.48-16.011 27.47 15.872-27.47 16.011z"
            ></path>
            <path
              fill="#F39A68"
              d="M1460.28 346.687l-27.48-15.871 27.48-16.011 27.47 15.871-27.47 16.011z"
            ></path>
            <path
              fill="#151515"
              d="M1460.28 346.687l-27.48-15.871v2.55l27.48 15.872v-2.551z"
            ></path>
          </g>
          <path
            fill="#F39A68"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1390.28 309.317l-27.48-15.872 27.48-16.011 27.47 15.872-27.47 16.011z"
          ></path>
          <path
            fill="#F39A68"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1390.28 306.766l-27.48-15.871 27.48-16.011 27.47 15.871-27.47 16.011z"
          ></path>
          <path
            fill="#F39A68"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1393.24 284.67l3.54 9.37-16.26-2.037 12.72-7.333z"
          ></path>
          <path
            fill="#ED6B22"
            d="M1396.78 294.04l-3.54-9.37-12.72 7.333 4.26.535 8.46-4.874 2.35 6.228 1.19.148z"
          ></path>
          <path
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1393.24 284.67l3.54 9.37-1.19-.148-2.35-6.228m0-2.994l-12.72 7.333 4.26.535 8.46-4.874m0-2.994v2.994"
          ></path>
          <path
            fill="#F39A68"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1390.28 306.767l27.47-16.011v2.55l-27.47 16.011v-2.55z"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1390.28 306.766l-27.48-15.871v2.55l27.48 15.872v-2.551z"
          ></path>
          <g>
            <path
              fill="#F39A68"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1425.28 329.277l-27.48-15.871 27.48-16.011 27.47 15.871-27.47 16.011z"
            ></path>
            <path
              fill="#F39A68"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1425.28 326.727l-27.48-15.872 27.48-16.011 27.47 15.872-27.47 16.011z"
            ></path>
            <path
              fill="#F39A68"
              stroke="#151515"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1428.24 304.63l3.54 9.371-16.26-2.037 12.72-7.334z"
            ></path>
            <path
              fill="#ED6B22"
              d="M1431.78 314.001l-3.54-9.371-12.72 7.334 4.26.534 8.46-4.874 2.35 6.228 1.19.149z"
            ></path>
            <path
              stroke="#151515"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1428.24 304.63l3.54 9.371-1.19-.149-2.35-6.228m0-2.994l-12.72 7.334 4.26.534 8.46-4.874m0-2.994v2.994"
            ></path>
            <path
              fill="#F39A68"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1425.28 326.727l27.47-16.011v2.551l-27.47 16.011v-2.551z"
            ></path>
            <path
              fill="#151515"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1425.28 326.727l-27.48-15.872v2.551l27.48 15.871v-2.55z"
            ></path>
          </g>
        </motion.g>
        <motion.g
          id="greenCurly"
          variants={animateIn("right", 1, 2.3)}
          initial="from"
          animate="toOffset"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            d="M1435.34 159.843c-2.94 1.699-6.82 2.783-12.59-.543l-8.2-4.735c-6.45-3.724-14.15-3.398-21.79 1.012l-4.76 2.747 6.7 3.868 4.26-2.458c2.06-1.193 4.95-1.265 7.07-.036l8.02 4.627c6.2 3.579 11.27 3.688 17.28 1.374-4.07 3.434-3.88 6.363 2.45 10.014l7.89 4.555c2.12 1.229 2 2.892-.07 4.085l-4.26 2.458 6.7 3.868 4.76-2.747c7.64-4.411 8.21-8.857 1.76-12.581l-8.08-4.663c-5.89-3.398-4.01-5.64-1.07-7.339l.94-.542-6.07-3.507-.94.543z"
            opacity="0.15"
          ></path>
          <path
            fill="#151515"
            d="M1435.34 153.683c-2.94 1.699-6.82 2.783-12.59-.543l-8.2-4.735c-6.45-3.724-14.15-3.399-21.79 1.012l-4.76 2.747 6.7 3.868 4.26-2.458c2.06-1.193 4.95-1.265 7.07-.036l8.02 4.627c6.2 3.579 11.27 3.688 17.28 1.374-4.07 3.434-3.88 6.362 2.45 10.014l7.89 4.555c2.12 1.229 2 2.892-.07 4.085l-4.26 2.458 6.7 3.868 4.76-2.747c7.64-4.411 8.21-8.857 1.76-12.581l-8.08-4.663c-5.89-3.398-4.01-5.64-1.07-7.339l.94-.542-6.07-3.507-.94.543z"
          ></path>
          <path
            fill="#151515"
            d="M1422.75 139.3c5.77 3.326 9.65 2.242 12.59.543l.94-.543 6.07 3.507v7.808c.05.024.09.049.13.073l8.08 4.663c3.06 1.767 4.54 3.696 4.43 5.707v13.837c-.11 2.228-2.17 4.556-6.19 6.874l-4.76 2.747v-13.837l4.55-2.625-6.11-3.529c-5.89-3.398-4.01-5.639-1.07-7.339l.94-.542-6.07-3.506-.94.542c-2.94 1.699-6.82 2.783-12.59-.542l-8.2-4.736c-6.45-3.724-14.15-3.398-21.79 1.012l-4.76 2.748v-13.838l4.76-2.747c7.64-4.41 15.34-4.736 21.79-1.012l8.2 4.735z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="1.5"
            d="M1442.35 142.807l-.94.542c-2.94 1.699-4.82 3.941 1.07 7.339l8.08 4.663c3.06 1.767 4.54 3.696 4.43 5.707m-12.64-18.251l-6.07-3.507-.94.543c-2.94 1.699-6.82 2.783-12.59-.543l-8.2-4.735c-6.45-3.724-14.15-3.398-21.79 1.012l-4.76 2.747v13.838l4.76-2.748c7.64-4.41 15.34-4.736 21.79-1.012l8.2 4.736c5.77 3.325 9.65 2.241 12.59.542l.94-.542 6.07 3.506m0-13.837v13.837m0 0l-.94.542c-2.94 1.7-4.82 3.941 1.07 7.339l6.11 3.529m6.4-6.996c-.11 2.228-2.17 4.556-6.19 6.874l-.21.122m6.4-6.996v13.837c-.11 2.228-2.17 4.556-6.19 6.874l-4.76 2.747v-13.837l4.55-2.625"
          ></path>
          <path
            fill="#3BBB96"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1435.34 139.843c-2.94 1.699-6.82 2.783-12.59-.543l-8.2-4.735c-6.45-3.724-14.15-3.398-21.79 1.012l-4.76 2.747 6.7 3.868 4.26-2.458c2.06-1.193 4.95-1.265 7.07-.036l8.02 4.627c6.2 3.579 11.27 3.688 17.28 1.374-4.07 3.434-3.88 6.363 2.45 10.014l7.89 4.555c2.12 1.229 2 2.892-.07 4.085l-4.26 2.458 6.7 3.868 4.76-2.747c7.64-4.411 8.21-8.857 1.76-12.581l-8.08-4.663c-5.89-3.398-4.01-5.64-1.07-7.339l.94-.542-6.07-3.507-.94.543z"
          ></path>
          <path
            fill="#75DCC0"
            d="M1394.7 156.03l-6.7-3.869v-13.837l6.7 3.868 4.26-2.458c2.06-1.193 4.95-1.265 7.07-.036l8.02 4.627c6.2 3.579 11.27 3.688 17.28 1.374-3.46 2.918-3.84 5.471 0 8.412.68.52 1.49 1.053 2.45 1.602l7.89 4.555c2.12 1.229 2 2.892-.07 4.085l-4.26 2.458 6.7 3.868v13.837l-6.7-3.868v-9.038l-3.56-2.06c-6.33-3.651-6.52-6.58-2.45-10.014-6.01 2.314-11.08 2.205-17.28-1.374l-8.02-4.627c-2.12-1.229-5.01-1.157-7.07.036l-4.26 2.459z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="1.5"
            d="M1394.7 156.03l-6.7-3.869v-13.837l6.7 3.868m0 13.838l4.26-2.459c2.06-1.193 4.95-1.265 7.07-.036l8.02 4.627c6.2 3.579 11.27 3.688 17.28 1.374m-36.63-3.506v-13.838m36.63 17.344c-4.07 3.434-3.88 6.363 2.45 10.014l3.56 2.06m-6.01-12.074v-5.425m-36.63-11.919l4.26-2.458c2.06-1.193 4.95-1.265 7.07-.036l8.02 4.627c6.2 3.579 11.27 3.688 17.28 1.374-3.46 2.918-3.84 5.471 0 8.412m6.01 12.7l4.26-2.458c2.07-1.193 2.19-2.856.07-4.085l-7.89-4.555a22.082 22.082 0 01-2.45-1.602m6.01 12.7l6.7 3.868v13.837l-6.7-3.868v-9.038m0-4.799v4.799"
          ></path>
          <path
            fill="#75DCC0"
            d="M1428.59 150.708c0 2.716-.15 9.807.15 13.126.75 2.867 2.61 3.923 3.32 4.225 0 0 3.77-10.561 1.36-12.221-2.42-1.66-2.87-1.961-3.93-3.018-1.05-1.056-.45-1.056-.9-2.112z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="2"
            d="M1415.91 159.006v-13.578"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="bevel"
            strokeWidth="1.5"
            d="M1426.02 160.666v-13.579m5.43 20.821v-13.579m-2.72 10.863v-14.484"
          ></path>
        </motion.g>
        <motion.g
          id="terminal"
          variants={animateIn("right", 1, 2.1)}
          initial="from"
          animate="toOffset"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            fillRule="evenodd"
            d="M1143.97 111.357L1076 150.596l83.42 48.156 83.41 48.157 67.97-39.239 12.75-7.357L1156.71 104l-12.74 7.357z"
            clipRule="evenodd"
            opacity="0.15"
          ></path>
          <path
            fill="#8E44EC"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1310.8 174.67l-166.83-96.313L1156.71 71l166.84 96.313-12.75 7.357zm0 17.091l-166.83-96.313 12.74-7.357 166.84 96.313-12.75 7.357z"
          ></path>
          <path
            fill="#B382F2"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.25"
            d="M1323.55 167.313l-12.75 7.357v17.091l12.75-7.357v-17.091z"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1310.8 174.67l-166.83-96.313V95.45l166.83 96.313V174.67z"
          ></path>
          <path
            fill="#151515"
            d="M1154.79 80.176c1.33.772 3.5.772 4.83 0 .67-.386 1-.768 1-1.144v-2.686c-.02-.49-.35-.975-1-1.349-1.34-.768-3.5-.768-4.83 0-.65.374-.98.86-1 1.349v2.686c0 .376.33.758 1 1.144z"
          ></path>
          <mask
            id="a"
            width="8"
            height="7"
            x="1153"
            y="74"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
          >
            <path
              fill="#9E00FF"
              d="M1154.79 80.176c1.33.772 3.5.772 4.83 0 .67-.386 1-.768 1-1.143V76.36c-.02-.49-.35-.975-1-1.348-1.34-.769-3.5-.769-4.83 0-.65.373-.98.859-1 1.348v2.672c0 .375.33.757 1 1.143z"
            ></path>
          </mask>
          <g mask="url(#a)">
            <path fill="#F7A1B0" d="M1156 72.254h7.315v10.71H1156z"></path>
            <path
              stroke="#151515"
              strokeLinejoin="bevel"
              strokeWidth="1.5"
              d="M1154.74 80.08c1.34.771 3.5.771 4.84 0 .66-.387 1-.769 1-1.144v-2.59c-.02-.49-.36-.975-1.01-1.349-1.33-.769-3.49-.769-4.83 0-.65.374-.98.86-1 1.348v2.591c0 .375.33.757 1 1.144z"
            ></path>
          </g>
          <g>
            <mask id="b" fill="#fff">
              <path d="M1159.62 77.798c-1.33.77-3.5.77-4.83 0-1.33-.769-1.33-2.016 0-2.785 1.33-.769 3.5-.769 4.83 0 1.34.77 1.34 2.016 0 2.785z"></path>
            </mask>
            <path
              fill="#F97289"
              stroke="#151515"
              strokeWidth="3"
              d="M1159.62 77.798c-1.33.77-3.5.77-4.83 0-1.33-.769-1.33-2.016 0-2.785 1.33-.769 3.5-.769 4.83 0 1.34.77 1.34 2.016 0 2.785z"
              mask="url(#b)"
            ></path>
          </g>
          <g>
            <path
              fill="#151515"
              d="M1162.45 84.302c1.34.771 3.5.771 4.84 0 .66-.387 1-.769 1-1.144v-2.687c-.02-.489-.36-.975-1.01-1.348-1.33-.769-3.49-.769-4.83 0-.64.373-.98.86-1 1.348v2.687c0 .375.33.757 1 1.144z"
            ></path>
            <mask
              id="c"
              width="8"
              height="7"
              x="1161"
              y="78"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
            >
              <path
                fill="#9E00FF"
                d="M1162.45 84.302c1.34.772 3.5.772 4.84 0 .66-.386 1-.768 1-1.143v-2.672c-.02-.489-.36-.975-1.01-1.348-1.33-.769-3.49-.769-4.83 0-.64.373-.98.86-1 1.348v2.672c0 .375.33.757 1 1.143z"
              ></path>
            </mask>
            <g mask="url(#c)">
              <path
                fill="#F39A68"
                d="M1163.67 76.38h7.315v10.71h-7.315z"
              ></path>
              <path
                stroke="#151515"
                strokeLinejoin="bevel"
                strokeWidth="1.5"
                d="M1162.4 84.206c1.34.771 3.5.771 4.84 0 .67-.387 1-.769 1-1.144v-2.59c-.02-.49-.36-.975-1-1.349-1.34-.769-3.5-.769-4.83 0-.65.373-.98.86-1 1.348v2.591c0 .375.33.757.99 1.144z"
              ></path>
            </g>
            <g>
              <mask id="d" fill="#fff">
                <path d="M1167.29 81.924c-1.34.769-3.5.769-4.84 0-1.33-.769-1.33-2.016 0-2.785 1.34-.769 3.5-.769 4.84 0 1.33.77 1.33 2.016 0 2.785z"></path>
              </mask>
              <path
                fill="#ED6B22"
                stroke="#151515"
                strokeWidth="3"
                d="M1167.29 81.924c-1.34.769-3.5.769-4.84 0-1.33-.769-1.33-2.016 0-2.785 1.34-.769 3.5-.769 4.84 0 1.33.77 1.33 2.016 0 2.785z"
                mask="url(#d)"
              ></path>
            </g>
          </g>
          <g>
            <path
              fill="#151515"
              d="M1170.12 89.016c1.33.772 3.5.772 4.83 0 .67-.386 1-.768 1-1.143v-2.687c-.02-.489-.36-.975-1-1.348-1.34-.769-3.5-.769-4.83 0-.65.373-.98.86-1 1.348v2.687c0 .375.33.757 1 1.143z"
            ></path>
            <mask
              id="e"
              width="7"
              height="7"
              x="1169"
              y="83"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
            >
              <path
                fill="#9E00FF"
                d="M1170.12 89.017c1.33.772 3.5.772 4.83 0 .67-.386 1-.768 1-1.143v-2.672c-.02-.489-.36-.975-1-1.348-1.34-.769-3.5-.769-4.83 0-.65.373-.98.859-1 1.348v2.672c0 .375.33.757 1 1.143z"
              ></path>
            </mask>
            <g mask="url(#e)">
              <path
                fill="#75DCC0"
                d="M1171.33 81.095h7.315v10.71h-7.315z"
              ></path>
              <path
                stroke="#151515"
                strokeLinejoin="bevel"
                strokeWidth="1.5"
                d="M1170.07 88.92c1.33.772 3.5.772 4.83 0 .67-.386 1-.768 1-1.143v-2.59c-.01-.49-.35-.976-1-1.349-1.33-.769-3.5-.769-4.83 0-.65.373-.98.86-1 1.348v2.591c0 .375.33.757 1 1.144z"
              ></path>
            </g>
            <g>
              <mask id="f" fill="#fff">
                <path d="M1174.95 86.639c-1.33.769-3.5.769-4.83 0-1.34-.77-1.34-2.016 0-2.785 1.33-.77 3.5-.77 4.83 0 1.33.769 1.33 2.016 0 2.785z"></path>
              </mask>
              <path
                fill="#3BBB96"
                stroke="#151515"
                strokeWidth="3"
                d="M1174.95 86.639c-1.33.769-3.5.769-4.83 0-1.34-.77-1.34-2.016 0-2.785 1.33-.77 3.5-.77 4.83 0 1.33.769 1.33 2.016 0 2.785z"
                mask="url(#f)"
              ></path>
            </g>
          </g>
          <g>
            <path
              fill="#303030"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1143.97 95.449l166.83 96.313L1242.83 231 1076 134.687l67.97-39.238z"
            ></path>
            <path
              fill="#303030"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1143.97 78.357l166.83 96.313-67.97 39.239L1076 117.596l67.97-39.239z"
            ></path>
            <path
              fill="#151515"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1076 117.595l166.83 96.313V231L1076 134.687v-17.092z"
            ></path>
            <path
              fill="#505050"
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1242.83 213.909l67.97-39.239v17.091L1242.83 231v-17.091z"
            ></path>
            <path
              fill="#fff"
              d="M1137.75 94.392l3.58-2.064.55.32-.58.336.03.016a2.841 2.841 0 01.8-.072c.14.013.29.041.44.084.14.043.29.107.44.192.37.216.55.459.54.728-.01.267-.23.525-.67.776l-2.29 1.324-.55-.32 2.19-1.268c.33-.19.5-.37.52-.544.01-.176-.11-.344-.39-.504a2.17 2.17 0 00-.37-.164 1.918 1.918 0 00-.41-.092 1.502 1.502 0 00-.41.008c-.14.021-.27.065-.38.132l-2.48 1.432-.56-.32zm7.5.202l.56.32-.59.336.03.016c.68-.122 1.26-.038 1.77.252.44.254.61.546.53.876-.08.334-.41.671-1 1.012-.59.342-1.18.535-1.76.58-.57.048-1.07-.054-1.51-.308-.51-.29-.65-.63-.44-1.02l-.03-.016-1.97 1.136-.55-.32 4.96-2.864zm-1.7 2.676c.33.187.67.275 1.04.264.38-.01.73-.109 1.06-.296l.61-.352c.32-.186.49-.388.5-.604.02-.216-.13-.417-.45-.604a1.97 1.97 0 00-1.27-.244c-.13.024-.26.071-.38.14l-1.29.744c-.12.07-.2.144-.25.224a.42.42 0 00-.02.248c.02.083.07.166.15.248.08.083.18.16.3.232zm1.84 1.53l3.14-.28.47-1.763.66.384-.21.748-.17.592.03.016 1.01-.104 1.29-.128.64.368-3.07.256-.47 1.828-.67-.384.24-.832.16-.564-.03-.016-.97.1-1.42.148-.63-.368zm9.59 5.634c-.26-.15-.45-.308-.56-.476a.754.754 0 01-.13-.512c.02-.174.11-.348.27-.524.16-.174.38-.342.67-.504.28-.163.57-.29.88-.38.3-.091.6-.143.9-.156.31-.016.6.008.89.072.29.064.56.169.81.316.35.2.55.406.62.62.06.213.02.42-.12.62l-.68-.12c.12-.144.16-.29.11-.436-.05-.144-.18-.28-.41-.408a1.763 1.763 0 00-.52-.204 1.943 1.943 0 00-.54-.056 2.122 2.122 0 00-1.04.3l-.61.352c-.16.09-.28.186-.38.288a.621.621 0 00-.14.316c-.01.106.02.213.1.32.07.104.2.204.36.3.24.138.5.221.76.248.27.026.55.01.84-.048l.12.384c-.35.077-.71.096-1.09.056-.38-.038-.75-.16-1.11-.368zm2.83.994l1.04.604 2.64-1.52-1.05-.604.47-.272 1.6.924-.9.52.04.02c.35-.12.71-.166 1.07-.14.37.027.71.132 1.03.316l.5.288-.55.32-.67-.388c-.32-.184-.67-.28-1.06-.288-.38-.005-.72.079-1.02.252l-1.54.892 1.38.8-.47.272-2.98-1.724.47-.272zm5 3.527c-.26-.15-.45-.31-.57-.48a.736.736 0 01-.15-.52c.02-.179.11-.356.25-.532.16-.179.37-.35.65-.512a3.944 3.944 0 011.83-.524c.31-.014.6.012.89.076.29.066.56.17.8.312.24.138.42.289.52.452.11.165.16.333.14.504-.01.168-.09.334-.23.5-.13.165-.33.321-.59.468l-.26.152-2.64-1.528-.17.096c-.16.09-.28.189-.36.296a.549.549 0 00-.13.324c0 .112.04.222.11.332.09.109.22.212.39.308.24.138.5.226.79.264.28.037.57.026.85-.032l.14.396c-.35.077-.73.089-1.13.036-.4-.054-.78-.183-1.13-.388zm3.25-1.916a1.863 1.863 0 00-.51-.196 2.374 2.374 0 00-1.13.008c-.19.045-.35.113-.51.204l-.05.028 2.05 1.184.08-.044c.15-.091.27-.188.35-.292a.512.512 0 00.13-.308c.02-.104-.01-.207-.09-.308a1.061 1.061 0 00-.32-.276zm2.07 4.89c-.22-.125-.32-.247-.3-.364.02-.117.1-.231.24-.34l-.03-.02c-.29.075-.58.096-.88.064a2.23 2.23 0 01-.86-.3c-.38-.216-.58-.444-.61-.684-.02-.24.13-.457.47-.652a1.89 1.89 0 011.13-.236c.42.037.91.212 1.45.524l.76.44.35-.204c.26-.152.39-.308.37-.468-.02-.163-.16-.323-.43-.48a1.976 1.976 0 00-.74-.256 2.451 2.451 0 00-.74.008l-.1-.376a2.852 2.852 0 01.98-.012c.18.027.37.072.55.136.19.061.37.144.55.248.42.243.65.496.68.76.04.267-.13.509-.51.728l-1.97 1.136.5.288-.48.28-.38-.22zm-1.27-1.172c.14.083.29.148.43.196.16.048.31.081.45.1.15.016.29.015.41-.004a.896.896 0 00.34-.108l.59-.34-.76-.44c-.33-.192-.62-.305-.87-.34a.969.969 0 00-.63.1l-.14.084c-.19.107-.26.225-.23.356.04.131.18.263.41.396zm4.03 2.771c-.27-.158-.39-.318-.37-.48.03-.16.16-.31.4-.448l2.29-1.32-1.19-.688.47-.272.88.512c.12.069.23.104.32.104.11 0 .22-.035.34-.104l.93-.54.53.308-1.26.728 1.63.94-.47.272-1.63-.94-2.63 1.52 1.63.94-.47.272-1.4-.804zm3.76 2.262c-.26-.149-.45-.309-.57-.48a.735.735 0 01-.15-.52c.02-.179.1-.356.25-.532.16-.179.37-.349.65-.512.29-.165.59-.292.9-.38.31-.085.62-.133.93-.144.31-.013.6.012.89.076.29.067.56.171.8.312.24.139.42.289.52.452.11.165.16.333.14.504-.01.168-.09.335-.23.5-.14.165-.33.321-.59.468l-.26.152-2.65-1.528-.16.096a1.15 1.15 0 00-.36.296.496.496 0 00-.13.324c0 .112.04.223.11.332.09.109.22.212.38.308.25.139.51.227.79.264.29.037.58.027.86-.032l.14.396c-.35.077-.73.089-1.13.036-.4-.053-.78-.183-1.13-.388zm3.25-1.916a1.895 1.895 0 00-.51-.196 2.446 2.446 0 00-1.14.008c-.18.045-.34.113-.5.204l-.05.028 2.05 1.184.08-.044c.15-.091.27-.188.35-.292a.51.51 0 00.13-.308c.02-.104-.01-.207-.09-.308a1.061 1.061 0 00-.32-.276zm1.52 2.482l.59-.336 2.01 1.16-.59.336-2.01-1.16zm1.74 3.099l3.58-2.064.55.32-.58.336.03.016a2.69 2.69 0 01.8-.072 2.118 2.118 0 01.88.276c.37.216.55.458.54.728-.01.266-.23.525-.67.776l-2.29 1.324-.55-.32 2.19-1.268c.33-.19.5-.371.52-.544.01-.176-.11-.344-.39-.504a2.147 2.147 0 00-.78-.256 1.475 1.475 0 00-.41.008c-.14.021-.27.065-.38.132l-2.48 1.432-.56-.32zm5.33 3.17c-.26-.149-.45-.309-.57-.48a.735.735 0 01-.15-.52.99.99 0 01.25-.532c.15-.178.37-.349.65-.512.29-.165.59-.292.9-.38.31-.085.62-.133.93-.144.3-.013.6.012.89.076.29.067.56.171.8.312.24.139.42.29.52.452.11.166.16.334.14.504-.01.168-.09.335-.23.5-.14.166-.33.322-.59.468l-.26.152-2.65-1.528-.16.096c-.16.091-.28.19-.36.296a.496.496 0 00-.13.324c0 .112.03.223.11.332.09.11.22.212.38.308.24.139.51.227.79.264.29.038.58.027.86-.032l.13.396c-.34.078-.72.09-1.12.036-.4-.053-.78-.182-1.13-.388zm3.25-1.916a2.033 2.033 0 00-.51-.196 2.567 2.567 0 00-.57-.064c-.19.003-.38.027-.57.072-.18.046-.35.114-.5.204l-.05.028 2.05 1.184.08-.044c.15-.09.27-.188.35-.292a.51.51 0 00.13-.308.457.457 0 00-.09-.308 1.09 1.09 0 00-.32-.276zm-.94 3.155l3.14-.28.47-1.764.66.384-.21.748-.17.592.03.016 1.01-.104 1.29-.128.64.368-3.07.256-.47 1.828-.67-.384.24-.832.16-.564-.03-.016-.97.1-1.42.148-.63-.368zm5.77 3.334c-.27-.157-.39-.317-.37-.48.03-.16.16-.309.4-.448l2.29-1.32-1.19-.688.47-.272.88.512c.12.069.23.104.32.104.1 0 .21-.035.33-.104l.94-.54.53.308-1.26.728 1.63.94-.47.272-1.63-.94-2.63 1.52 1.63.94-.47.272-1.4-.804zm4.59.551l.58-.336 2.01 1.16-.58.336-2.01-1.16zm4.48 4.686c-.21-.125-.31-.247-.29-.364.01-.117.09-.231.24-.34l-.04-.02c-.28.075-.57.096-.87.064a2.272 2.272 0 01-.87-.3c-.37-.216-.57-.444-.6-.684-.03-.24.13-.457.47-.652.33-.192.7-.271 1.12-.236.43.037.91.212 1.45.524l.76.44.36-.204c.26-.152.38-.308.37-.468-.02-.163-.16-.323-.43-.48a1.976 1.976 0 00-.74-.256 2.52 2.52 0 00-.75.008l-.09-.376a2.723 2.723 0 01.97-.012c.19.027.37.072.56.136.19.061.37.144.55.248.42.243.65.496.68.76.04.267-.13.509-.51.728l-1.97 1.136.5.288-.49.28-.38-.22zm-1.26-1.172c.14.083.28.148.43.196.16.048.31.081.45.1.15.016.29.015.41-.004a.958.958 0 00.34-.108l.59-.34-.76-.44c-.34-.192-.62-.305-.87-.34a.969.969 0 00-.63.1l-.14.084c-.19.107-.27.225-.23.356.04.131.17.263.41.396zm6.01-.214l.56.32-.58.336.02.016c.68-.122 1.27-.038 1.77.252.44.254.62.546.53.876-.08.334-.41.671-1 1.012-.59.342-1.18.535-1.75.58-.58.048-1.08-.054-1.52-.308-.5-.29-.65-.63-.44-1.02l-.03-.016-1.96 1.136-.56-.32 4.96-2.864zm-1.69 2.676c.32.187.67.275 1.04.264.37-.01.72-.109 1.05-.296l.61-.352c.32-.186.49-.388.5-.604.03-.216-.12-.417-.45-.604a2.004 2.004 0 00-.84-.26 1.6 1.6 0 00-.42.016c-.14.024-.27.071-.39.14l-1.28.744c-.12.07-.21.144-.25.224a.357.357 0 00-.03.248c.02.083.07.166.15.248.08.083.18.16.31.232zm5.64-.397l.55.32-.58.336.03.016c.67-.123 1.26-.039 1.77.252.44.253.61.545.53.876-.08.333-.41.671-1 1.012-.6.341-1.18.535-1.76.58-.57.048-1.08-.055-1.51-.308-.51-.291-.65-.631-.44-1.02l-.03-.016-1.97 1.136-.55-.32 4.96-2.864zm-1.7 2.676c.33.187.67.275 1.04.264.38-.011.73-.109 1.05-.296l.61-.352c.33-.187.5-.388.51-.604.02-.216-.13-.417-.45-.604a2.22 2.22 0 00-.4-.176 2.009 2.009 0 00-.44-.084 1.676 1.676 0 00-.43.016c-.13.024-.26.071-.38.14l-1.29.744a.688.688 0 00-.25.224.524.524 0 00-.03.248c.03.083.08.165.16.248.08.083.18.16.3.232zm6.04 3.957l3.57-2.064.56.32-.58.336.02.016c.13-.03.26-.051.39-.064.14-.016.28-.019.42-.008a2.178 2.178 0 01.88.276c.37.216.55.458.54.728-.01.266-.23.525-.67.776l-2.29 1.324-.56-.32 2.2-1.268c.33-.19.5-.371.51-.544.02-.176-.11-.344-.38-.504a2.553 2.553 0 00-.37-.164 2.016 2.016 0 00-.41-.092 1.555 1.555 0 00-.42.008c-.13.021-.26.065-.38.132l-2.48 1.432-.55-.32zm5.32 3.17a1.688 1.688 0 01-.56-.48.797.797 0 01-.16-.52c.03-.178.11-.356.26-.532.15-.178.37-.349.65-.512.29-.165.58-.292.89-.38.32-.085.63-.133.93-.144.31-.013.61.012.9.076.29.067.56.171.8.312.24.139.41.29.52.452.11.166.16.334.14.504a.933.933 0 01-.23.5c-.14.166-.34.322-.59.468l-.26.152-2.65-1.528-.17.096c-.15.091-.27.19-.36.296a.629.629 0 00-.13.324c0 .112.04.223.12.332.09.11.21.212.38.308.24.139.5.227.79.264.29.038.57.027.86-.032l.13.396c-.34.078-.72.09-1.13.036a3.11 3.11 0 01-1.13-.388zm3.25-1.916a1.829 1.829 0 00-.5-.196 2.635 2.635 0 00-.57-.064c-.19.003-.38.027-.57.072-.18.046-.35.114-.51.204l-.04.028 2.05 1.184.07-.044c.16-.09.28-.188.36-.292a.578.578 0 00.13-.308.457.457 0 00-.09-.308c-.07-.098-.18-.19-.33-.276zm-.94 3.155l3.15-.28.46-1.764.67.384-.22.748-.16.592.03.016 1.01-.104 1.29-.128.63.368-3.06.256-.48 1.828-.66-.384.23-.832.16-.564-.02-.016-.97.1-1.42.148-.64-.368zm5.78 3.334c-.27-.157-.4-.317-.37-.48.02-.16.16-.309.4-.448l2.28-1.32-1.19-.688.47-.272.89.512c.12.069.23.104.32.104.1 0 .21-.035.33-.104l.94-.54.53.308-1.26.728 1.63.94-.47.272-1.63-.94-2.63 1.52 1.62.94-.47.272-1.39-.804zm4.58.55l.59-.336 2 1.16-.58.336-2.01-1.16zm5.29 1.023l.56.32-.58.336.02.016c.68-.123 1.27-.039 1.77.252.44.253.62.545.53.876-.07.333-.41.671-1 1.012-.59.341-1.18.535-1.75.58-.58.048-1.08-.055-1.52-.308-.5-.291-.65-.631-.44-1.02l-.02-.016-1.97 1.136-.56-.32 4.96-2.864zm-1.69 2.676c.32.187.67.275 1.04.264.37-.011.73-.109 1.05-.296l.61-.352c.32-.187.49-.388.5-.604.03-.216-.12-.417-.45-.604a1.736 1.736 0 00-.4-.176 1.924 1.924 0 00-.86-.068c-.14.024-.26.071-.38.14l-1.29.744c-.12.069-.21.144-.25.224a.357.357 0 00-.03.248c.02.083.07.165.15.248.08.083.18.16.31.232zm2.41 1.322l1.05.604 2.63-1.52-1.05-.604.48-.272 1.6.924-.9.52.03.02c.36-.12.71-.166 1.07-.14.37.027.72.132 1.04.316l.5.288-.56.32-.67-.388c-.32-.184-.67-.28-1.05-.288-.38-.005-.72.079-1.02.252l-1.55.892 1.39.8-.47.272-2.99-1.724.47-.272zm9.61 1.051c-.16-.094-.24-.178-.24-.252 0-.078.05-.146.16-.204l.11-.064c.1-.059.21-.088.34-.088.14-.003.28.042.45.136.16.093.24.178.23.256 0 .074-.05.141-.15.2l-.11.064a.729.729 0 01-.35.092.901.901 0 01-.44-.14zm-5.46 1.344l1.29.744 2.63-1.52-1.29-.744.47-.272 1.85 1.064-3.11 1.792 1.21.696-.47.272-3.05-1.76.47-.272zm4.78 3.398c-.38-.216-.64-.438-.79-.668-.13-.229-.19-.46-.17-.692l.7.028c-.01.203.04.391.15.564.1.174.3.343.59.508.27.16.55.263.82.308.28.046.53.007.74-.116.09-.053.15-.108.17-.164a.171.171 0 00.02-.168.545.545 0 00-.12-.164 1.48 1.48 0 00-.18-.168l-.48-.372c-.1-.082-.22-.176-.33-.28a.993.993 0 01-.24-.316.508.508 0 01-.02-.344c.04-.114.16-.228.36-.34.18-.104.37-.173.56-.208.21-.034.42-.04.64-.016a3.36 3.36 0 011.3.44c.33.187.56.378.69.572.14.198.2.398.19.6l-.7-.012a.542.542 0 00-.09-.396.814.814 0 00-.2-.244 1.913 1.913 0 00-.37-.264c-.28-.162-.55-.26-.8-.292-.24-.029-.46.01-.64.116a.515.515 0 00-.19.164.243.243 0 000 .168c.02.056.06.112.11.168.06.056.12.111.19.164l.48.372c.11.086.22.179.33.28.11.102.19.208.24.32.05.11.05.222.01.336-.04.118-.15.232-.35.344-.35.206-.77.284-1.24.236-.46-.045-.93-.2-1.38-.464zm2.28 1.223l3.58-2.064.51.296-.42.24.03.016c.19-.048.39-.071.59-.068.2.002.4.061.6.176.2.12.3.24.3.36 0 .117-.07.23-.21.34l.02.012c.22-.056.45-.08.67-.072.23.008.45.073.66.196.29.168.39.338.28.512-.1.176-.34.373-.72.592l-2.48 1.432-.51-.296 2.39-1.38c.3-.176.48-.316.53-.42.06-.104.01-.204-.16-.3a.962.962 0 00-.5-.124c-.19 0-.38.056-.57.168l-2.63 1.516-.51-.296 2.39-1.38c.3-.176.48-.316.53-.42.06-.104.01-.203-.15-.296a1.006 1.006 0 00-.51-.128c-.19 0-.38.056-.57.168l-2.63 1.516-.51-.296zm10.24.87c-.16-.093-.24-.177-.24-.252 0-.077.05-.145.15-.204l.12-.064c.1-.059.21-.088.34-.088.14-.003.28.043.45.136.16.093.24.179.23.256 0 .075-.05.141-.15.2l-.11.064a.728.728 0 01-.36.092.869.869 0 01-.43-.14zm-5.46 1.344l1.29.744 2.63-1.52-1.29-.744.47-.272 1.85 1.064-3.11 1.792 1.21.696-.47.272-3.05-1.76.47-.272zm4.86 3.447c-.26-.15-.45-.308-.56-.476a.754.754 0 01-.13-.512c.03-.174.12-.348.27-.524.17-.174.39-.342.67-.504.28-.163.57-.29.88-.38.3-.091.61-.143.91-.156.3-.016.6.008.88.072.29.064.56.169.81.316.35.2.56.406.62.62.06.213.03.42-.12.62l-.68-.12c.12-.144.16-.29.11-.436-.05-.144-.18-.28-.4-.408a2.025 2.025 0 00-1.06-.26c-.19.005-.37.033-.55.084-.18.053-.34.125-.5.216l-.61.352c-.16.09-.28.186-.37.288a.566.566 0 00-.15.316c-.01.106.02.213.1.32.08.104.2.204.36.3.24.138.5.221.77.248.26.026.54.01.83-.048l.12.384a3.36 3.36 0 01-1.09.056c-.38-.038-.75-.16-1.11-.368zm-132.44-66.56l3.58-2.064.55.32-.58.336.03.016a2.841 2.841 0 01.8-.072c.14.013.29.041.44.084.14.043.29.107.44.192.37.216.55.459.54.728-.01.267-.23.525-.67.776l-2.29 1.324-.55-.32 2.19-1.268c.33-.19.5-.37.52-.544.01-.176-.12-.344-.39-.504a2.17 2.17 0 00-.37-.164 1.918 1.918 0 00-.41-.092 1.502 1.502 0 00-.41.008c-.14.021-.27.065-.38.132l-2.49 1.432-.55-.32zm7.5.202l.56.32-.59.336.03.016c.68-.122 1.26-.038 1.77.252.44.254.61.546.53.876-.08.334-.41.671-1 1.012-.59.342-1.18.535-1.76.58-.57.048-1.07-.054-1.51-.308-.51-.29-.65-.63-.44-1.02l-.03-.016-1.97 1.136-.55-.32 4.96-2.864zm-1.7 2.676c.33.187.67.275 1.04.264.38-.01.73-.109 1.06-.296l.61-.352c.32-.186.49-.388.5-.604.02-.216-.13-.417-.45-.604a2.004 2.004 0 00-.84-.26 1.692 1.692 0 00-.43.016c-.13.024-.26.071-.38.14l-1.29.744c-.12.07-.2.144-.25.224a.42.42 0 00-.02.248c.02.083.07.166.15.248.08.083.18.16.3.232zm1.84 1.531l3.14-.28.47-1.764.66.384-.21.748-.17.592.03.016 1.01-.104 1.29-.128.64.368-3.07.256-.47 1.828-.67-.384.24-.832.16-.564-.03-.016-.97.1-1.42.148-.63-.368zm9.84 6.577l-.86-.492c-.35-.203-.58-.408-.7-.616a.662.662 0 01-.04-.64c.09-.219.28-.45.57-.692.3-.24.68-.499 1.17-.776.53-.31 1.01-.548 1.44-.716.44-.168.84-.276 1.2-.324.36-.048.69-.04.99.024.3.064.59.174.86.332.28.16.47.321.58.484.11.165.15.328.12.488-.03.16-.12.317-.28.472-.14.154-.34.301-.58.44l-2.58 1.488-.49-.284.4-.228-.04-.02c-.16.042-.35.062-.56.06-.2-.006-.4-.067-.61-.184-.28-.163-.39-.36-.32-.592.08-.235.37-.5.88-.796.52-.296.98-.466 1.38-.508.41-.043.75.017 1.03.18.11.058.18.117.23.176.05.061.08.121.09.18.01.058 0 .114-.02.168a.495.495 0 01-.08.152l.03.02.17-.096c.39-.227.62-.454.68-.68.06-.224-.09-.443-.46-.656a1.993 1.993 0 00-1.36-.236c-.49.08-1.09.321-1.78.724l-.9.516c-.27.154-.5.31-.7.468-.19.154-.33.31-.41.468a.548.548 0 00.01.468c.08.16.25.32.53.48l.85.492-.44.256zm1.19-1.32c.16.096.34.145.53.148.2.005.38-.043.56-.144l1.06-.612c.17-.102.25-.208.25-.32-.01-.11-.09-.212-.26-.308-.2-.112-.41-.159-.65-.14-.22.018-.49.117-.8.296l-.42.244c-.31.178-.48.334-.52.468-.03.133.05.256.25.368zm2.42 2.606c-.37-.216-.63-.438-.78-.668-.14-.229-.2-.46-.18-.692l.7.028c-.01.203.04.391.15.564.11.174.3.343.59.508.28.16.55.263.82.308.28.046.53.007.74-.116a.4.4 0 00.18-.164.198.198 0 00.01-.168.415.415 0 00-.12-.164 1.48 1.48 0 00-.18-.168l-.47-.372a6.08 6.08 0 01-.34-.28.993.993 0 01-.24-.316.455.455 0 01-.01-.344c.04-.114.16-.228.35-.34.18-.104.37-.173.57-.208a2.663 2.663 0 011.29.132c.23.075.44.172.65.292.32.187.55.378.68.572.14.198.21.398.2.6l-.7-.012c.01-.053 0-.113-.01-.18a.419.419 0 00-.08-.216 1.004 1.004 0 00-.2-.244c-.1-.085-.22-.173-.38-.264-.28-.162-.54-.26-.79-.292-.25-.029-.46.01-.65.116a.614.614 0 00-.19.164.243.243 0 000 .168c.03.056.06.112.12.168.06.056.12.111.18.164l.48.372c.11.086.22.179.33.28.11.102.19.208.24.32.05.11.05.222.01.336-.03.118-.15.232-.34.344-.36.206-.77.284-1.24.236a3.43 3.43 0 01-1.39-.464zm2.94 1.055l1.24.72 4.19-2.416-1.25-.72.47-.272 1.8 1.04-4.65 2.688 1.24.72-.47.272-3.05-1.76.48-.272zm9.58 1.038c-.16-.093-.24-.177-.24-.252 0-.077.06-.145.16-.204l.11-.064c.1-.059.22-.088.35-.088.13-.003.28.043.44.136.16.093.24.179.23.256 0 .075-.05.141-.15.2l-.11.064a.717.717 0 01-.35.092.901.901 0 01-.44-.14zm-5.46 1.344l1.29.744 2.63-1.52-1.29-.744.48-.272 1.84 1.064-3.11 1.792 1.21.696-.47.272-3.05-1.76.47-.272zm4.86 3.447c-.26-.15-.44-.308-.56-.476-.1-.168-.15-.339-.12-.512.02-.174.11-.348.27-.524.16-.174.38-.342.66-.504a4.1 4.1 0 01.88-.38c.31-.091.61-.143.91-.156.3-.016.6.008.89.072.28.064.55.169.81.316.34.2.55.406.61.62.07.213.03.42-.11.62l-.68-.12c.12-.144.15-.29.1-.436-.05-.144-.18-.28-.4-.408a2.025 2.025 0 00-1.06-.26c-.19.005-.37.033-.55.084-.17.053-.34.125-.5.216l-.61.352c-.15.09-.28.186-.37.288a.566.566 0 00-.15.316c-.01.106.03.213.1.32.08.104.2.204.37.3.24.138.49.221.76.248.27.026.54.01.83-.048l.13.384c-.35.077-.72.096-1.1.056-.38-.038-.75-.16-1.11-.368zm3.89 2.242c-.26-.149-.45-.309-.57-.48a.735.735 0 01-.15-.52c.02-.179.1-.356.25-.532.15-.179.37-.349.65-.512.29-.165.59-.292.9-.38.31-.085.62-.133.93-.144.31-.013.6.012.89.076.29.067.56.171.8.312.24.139.42.289.52.452.11.165.16.333.14.504-.01.168-.09.335-.23.5-.14.165-.33.321-.59.468l-.26.152-2.65-1.528-.16.096a1.15 1.15 0 00-.36.296.496.496 0 00-.13.324c0 .112.04.223.11.332.09.109.22.212.38.308.24.139.51.227.79.264.29.037.58.027.86-.032l.14.396c-.35.077-.73.089-1.13.036-.4-.053-.78-.183-1.13-.388zm3.25-1.916a2.033 2.033 0 00-.51-.196 2.446 2.446 0 00-1.14.008c-.18.045-.34.113-.5.204l-.05.028 2.05 1.184.08-.044c.15-.091.27-.188.35-.292a.51.51 0 00.13-.308c.02-.104-.01-.207-.09-.308a1.061 1.061 0 00-.32-.276zm-.99 3.126l3.57-2.064.52.296-.42.24.03.016c.19-.048.39-.07.59-.068.2.003.4.062.59.176.21.12.31.24.31.36 0 .118-.07.231-.22.34l.02.012c.23-.056.46-.08.68-.072.23.008.45.074.66.196.29.168.39.339.28.512-.1.176-.34.374-.72.592l-2.48 1.432-.51-.296 2.39-1.38c.3-.176.48-.316.53-.42.06-.104.01-.204-.16-.3a.994.994 0 00-.51-.124c-.18 0-.37.056-.56.168l-2.63 1.516-.51-.296 2.39-1.38c.3-.176.48-.316.53-.42.06-.104.01-.202-.15-.296a1.016 1.016 0 00-.51-.128c-.19 0-.38.056-.57.168l-2.63 1.516-.51-.296zm7 4.043c-.22-.126-.32-.247-.3-.364.02-.118.1-.231.25-.34l-.04-.02a2.42 2.42 0 01-.87.064 2.217 2.217 0 01-.87-.3c-.37-.216-.57-.444-.6-.684-.03-.24.13-.458.46-.652.34-.192.71-.271 1.13-.236.43.037.91.212 1.45.524l.76.44.36-.204c.26-.152.38-.308.36-.468-.01-.163-.15-.323-.43-.48a1.931 1.931 0 00-.73-.256 2.518 2.518 0 00-.75.008l-.1-.376c.14-.027.3-.043.46-.048.17-.006.34.006.52.036.19.026.37.072.56.136.18.061.37.144.55.248.42.242.65.496.68.76.04.266-.14.509-.51.728l-1.97 1.136.5.288-.49.28-.38-.22zm-1.27-1.172c.15.082.29.148.44.196.16.048.31.081.45.1.15.016.28.014.41-.004a.958.958 0 00.34-.108l.59-.34-.76-.44c-.34-.192-.63-.306-.87-.34-.25-.035-.46-.002-.63.1l-.15.084c-.18.106-.26.225-.23.356.05.13.18.262.41.396zm3.91 2.79c-.26-.149-.45-.308-.56-.476a.753.753 0 01-.13-.512c.03-.173.12-.348.27-.524.16-.173.39-.341.67-.504a3.988 3.988 0 011.78-.536c.31-.016.61.008.89.072.29.064.56.17.81.316.35.2.55.407.62.62.06.214.02.42-.12.62l-.68-.12c.12-.144.16-.289.11-.436-.05-.144-.18-.28-.41-.408a1.82 1.82 0 00-.52-.204 2.021 2.021 0 00-.54-.056c-.18.006-.36.034-.54.084a2.42 2.42 0 00-.5.216l-.61.352c-.16.091-.28.187-.38.288a.625.625 0 00-.14.316.45.45 0 00.1.32c.07.104.2.204.36.3.24.139.5.222.77.248.26.027.54.011.83-.048l.12.384c-.35.078-.71.096-1.09.056-.38-.037-.75-.16-1.11-.368zm7.63-1.609l.55.32-2.13 1.232.03.016c.12-.03.25-.051.39-.064a2.066 2.066 0 011.29.268c.38.216.56.458.54.728-.01.266-.23.525-.66.776l-2.3 1.324-.55-.32 2.2-1.268c.32-.19.49-.371.51-.544.02-.176-.11-.344-.39-.504a1.852 1.852 0 00-.37-.164 1.877 1.877 0 00-.41-.092 1.49 1.49 0 00-.41.008c-.14.021-.27.065-.38.132l-2.48 1.432-.56-.32 5.13-2.96zm4.81 3.654c-.17-.093-.25-.177-.25-.252.01-.077.06-.145.16-.204l.11-.064c.1-.059.22-.088.35-.088.13-.003.28.043.44.136.16.093.24.179.24.256 0 .075-.05.141-.15.2l-.11.064a.757.757 0 01-.36.092.869.869 0 01-.43-.14zm-5.46 1.344l1.28.744 2.64-1.52-1.29-.744.47-.272 1.84 1.064-3.1 1.792 1.2.696-.47.272-3.04-1.76.47-.272zm3.42 2.519l3.57-2.064.56.32-.59.336.03.016c.13-.03.26-.051.39-.064a2.096 2.096 0 01.85.076c.15.042.3.106.44.192.38.216.56.458.54.728 0 .266-.23.525-.66.776l-2.29 1.324-.56-.32 2.2-1.268c.33-.19.5-.371.51-.544.02-.176-.11-.344-.39-.504a2.016 2.016 0 00-.77-.256 1.555 1.555 0 00-.42.008c-.14.021-.26.065-.38.132l-2.48 1.432-.55-.32zm5.32 3.17c-.26-.149-.45-.309-.57-.48a.846.846 0 01-.15-.52c.02-.179.11-.356.26-.532.15-.179.37-.349.65-.512a3.795 3.795 0 011.82-.524c.31-.013.61.012.89.076.3.067.56.171.81.312.24.139.41.289.52.452.11.165.15.333.14.504a.933.933 0 01-.23.5c-.14.165-.34.321-.59.468l-.26.152-2.65-1.528-.17.096a1.44 1.44 0 00-.36.296.554.554 0 00-.13.324c0 .112.04.223.12.332.09.109.21.212.38.308.24.139.5.227.79.264.29.037.57.027.86-.032l.13.396c-.35.077-.72.089-1.13.036-.4-.053-.77-.183-1.13-.388zm3.25-1.916a1.775 1.775 0 00-.51-.196 2.423 2.423 0 00-.56-.064c-.19.003-.38.027-.57.072-.18.045-.35.113-.51.204l-.05.028 2.05 1.184.08-.044c.16-.091.28-.188.35-.292a.527.527 0 00.14-.308.456.456 0 00-.09-.308.998.998 0 00-.33-.276zm-1.69 3.822l8.63-2.2.5.288-8.63 2.2-.5-.288zm10.94.175c-.16-.093-.24-.177-.24-.252 0-.077.06-.145.16-.204l.11-.064c.1-.059.22-.088.35-.088.13-.003.28.043.44.136.16.093.24.179.23.256 0 .075-.05.141-.15.2l-.11.064a.717.717 0 01-.35.092.901.901 0 01-.44-.14zm-5.46 1.344l1.29.744 2.63-1.52-1.29-.744.48-.272 1.84 1.064-3.11 1.792 1.21.696-.47.272-3.05-1.76.47-.272zm3.42 2.518l3.58-2.064.55.32-.58.336.03.016c.12-.029.25-.05.38-.064.14-.016.28-.018.42-.008.14.014.29.042.44.084.14.043.29.107.44.192.37.216.55.459.54.728-.01.267-.23.526-.66.776l-2.3 1.324-.55-.32 2.19-1.268c.33-.189.5-.37.52-.544.02-.176-.11-.344-.39-.504a1.91 1.91 0 00-.37-.164 1.936 1.936 0 00-.41-.092 1.522 1.522 0 00-.41.008c-.14.022-.27.066-.38.132l-2.48 1.432-.56-.32zm9.93.695c-.16-.094-.24-.178-.24-.252.01-.078.06-.146.16-.204l.11-.064c.1-.059.22-.088.35-.088.13-.003.28.042.44.136.16.093.24.178.24.256 0 .074-.05.141-.16.2l-.11.064a.729.729 0 01-.35.092c-.13 0-.27-.047-.44-.14zm-5.46 1.344l1.29.744 2.64-1.52-1.29-.744.47-.272 1.84 1.064-3.1 1.792 1.2.696-.47.272-3.05-1.76.47-.272zm5 3.426c-.28-.157-.4-.317-.38-.48.03-.16.16-.309.4-.448l2.29-1.32-1.19-.688.47-.272.89.512c.12.07.22.104.32.104s.21-.034.33-.104l.93-.54.54.308-1.26.728 1.62.94-.47.272-1.62-.94-2.64 1.52 1.63.94-.47.272-1.39-.804zm-93.11-43.755l3.58-2.064.55.32-.58.336.03.016a2.841 2.841 0 01.8-.072c.14.013.29.041.44.084.14.043.29.107.44.192.37.216.55.459.54.728-.01.267-.23.525-.67.776l-2.29 1.324-.55-.32 2.19-1.268c.33-.189.5-.371.52-.544.01-.176-.12-.344-.39-.504a2.147 2.147 0 00-.78-.256 1.514 1.514 0 00-.41.008 1.14 1.14 0 00-.39.132l-2.48 1.432-.55-.32zm7.5.202l.56.32-.59.336.03.016c.68-.122 1.26-.038 1.77.252.44.254.61.546.53.876-.08.334-.41.671-1 1.012-.59.342-1.18.535-1.76.58-.57.048-1.07-.054-1.51-.308-.51-.29-.65-.63-.44-1.02l-.03-.016-1.97 1.136-.55-.32 4.96-2.864zm-1.7 2.676c.33.187.67.275 1.04.264.38-.01.73-.109 1.06-.296l.61-.352c.32-.186.49-.388.5-.604.02-.216-.13-.417-.45-.604a2.004 2.004 0 00-.84-.26 1.692 1.692 0 00-.43.016c-.13.024-.26.071-.38.14l-1.29.744c-.12.07-.2.144-.25.224a.42.42 0 00-.02.248c.02.083.07.166.15.248.08.083.18.16.3.232zm1.79 1.503l3.57-2.064.52.296-.42.24.03.016c.19-.048.39-.071.59-.068.2.003.39.061.59.176.21.12.31.24.31.36 0 .117-.07.231-.22.34l.02.012c.23-.056.46-.08.68-.072.23.008.45.073.66.196.29.168.38.339.28.512-.1.176-.34.373-.72.592l-2.48 1.432-.52-.296 2.39-1.38c.31-.176.49-.316.54-.42.06-.104 0-.204-.16-.3a.984.984 0 00-.51-.124c-.18 0-.37.056-.57.168l-2.62 1.516-.51-.296 2.39-1.38c.3-.176.48-.316.53-.42.06-.104.01-.203-.15-.296a1.028 1.028 0 00-.52-.128c-.18 0-.37.056-.56.168l-2.63 1.516-.51-.296zm8.52 4.377l1.05.604 2.63-1.52-1.05-.604.48-.272 1.6.924-.91.52.04.02c.36-.12.71-.167 1.07-.14.37.026.72.132 1.04.316l.49.288-.55.32-.67-.388c-.32-.184-.67-.28-1.05-.288-.38-.006-.72.078-1.02.252l-1.55.892 1.39.8-.47.272-2.99-1.724.47-.272zm6.45 3.594l-.03-.016c-.12.03-.26.052-.39.068-.14.014-.28.014-.42 0-.14-.01-.28-.037-.43-.08a1.911 1.911 0 01-.44-.192c-.38-.216-.56-.457-.55-.724.01-.269.24-.529.67-.78l2.3-1.324.55.32-2.2 1.268c-.32.19-.5.372-.52.548-.01.174.12.34.4.5.11.064.23.119.37.164.13.046.27.076.4.092.14.016.28.015.41-.004.14-.021.27-.066.39-.136l2.48-1.432.56.32-3.58 2.064-.55-.32.58-.336zm1.12 1.319l3.57-2.064.56.32-.58.336.02.016c.13-.03.26-.051.39-.064.14-.016.28-.019.42-.008a2.178 2.178 0 01.88.276c.37.216.55.458.54.728-.01.266-.23.525-.67.776l-2.29 1.324-.56-.32 2.2-1.268c.33-.19.5-.371.51-.544.02-.176-.11-.344-.38-.504a2.553 2.553 0 00-.37-.164 2.016 2.016 0 00-.41-.092 1.555 1.555 0 00-.42.008c-.13.021-.26.065-.38.132l-2.48 1.432-.55-.32zm10.74 5.529l-.03-.016c-.67.122-1.26.038-1.77-.252-.43-.254-.61-.547-.54-.88.09-.331.42-.667 1.02-1.008.59-.342 1.17-.536 1.74-.584.58-.046 1.09.058 1.53.312.5.29.64.63.43 1.02l.03.016 2.13-1.232.56.32-5.13 2.96-.55-.32.58-.336zm-1.09-.428c.13.072.26.13.4.176.15.045.29.074.43.088.15.01.29.004.42-.02.15-.024.28-.071.4-.14l1.29-.744c.12-.07.2-.144.23-.224.05-.08.06-.162.04-.244a.542.542 0 00-.15-.252c-.08-.083-.18-.16-.3-.232a1.952 1.952 0 00-1.05-.264c-.37.01-.72.109-1.04.296l-.61.352c-.33.186-.5.388-.52.604-.02.216.14.417.46.604zm3.57 2.626c-.26-.149-.45-.309-.57-.48a.735.735 0 01-.15-.52c.02-.179.1-.356.25-.532.15-.179.37-.349.65-.512.29-.165.59-.292.9-.38.31-.085.62-.133.93-.144.3-.013.6.012.89.076.29.067.56.171.8.312.24.139.42.289.52.452.11.165.16.333.14.504-.01.168-.09.335-.23.5-.14.165-.33.321-.59.468l-.26.152-2.65-1.528-.16.096a1.15 1.15 0 00-.36.296.496.496 0 00-.13.324c0 .112.03.223.11.332.09.109.22.212.38.308.24.139.51.227.79.264.29.037.58.027.86-.032l.13.396c-.34.077-.72.089-1.12.036-.4-.053-.78-.183-1.13-.388zm3.25-1.916a2.033 2.033 0 00-.51-.196 2.446 2.446 0 00-1.14.008c-.18.045-.35.113-.5.204l-.05.028 2.05 1.184.08-.044c.15-.091.27-.188.35-.292a.51.51 0 00.13-.308c.02-.104-.01-.207-.09-.308a1.061 1.061 0 00-.32-.276zm.36 3.906l2.29-2.804.56.324-.98 1.16-1.06 1.252.03.016 2.17-.612 2.01-.568.54.316-4.85 1.324-.71-.408z"
            ></path>
            <path
              fill="#ED6B22"
              d="M1103.26 114.48l4.84-2.792.58.336-4.33 2.5 2.29 1.324-.5.292-2.88-1.66zm9.78.606c-.16-.093-.24-.177-.24-.252 0-.077.06-.145.16-.204l.11-.064c.1-.058.22-.088.35-.088.13-.002.28.043.44.136.16.094.24.179.24.256 0 .075-.06.142-.16.2l-.11.064c-.1.059-.22.09-.35.092a.89.89 0 01-.44-.14zm-5.46 1.344l1.29.744 2.63-1.52-1.28-.744.47-.272 1.84 1.064-3.1 1.792 1.2.696-.47.272-3.05-1.76.47-.272zm4.78 3.399c-.37-.216-.63-.439-.78-.668-.14-.229-.2-.46-.18-.692l.7.028c-.01.203.04.391.15.564.11.173.3.343.59.508.28.16.55.263.82.308.28.045.53.007.74-.116a.4.4 0 00.18-.164.198.198 0 00.01-.168.408.408 0 00-.12-.164 1.48 1.48 0 00-.18-.168l-.47-.372a6.556 6.556 0 01-.34-.28 1.004 1.004 0 01-.24-.316.455.455 0 01-.01-.344c.04-.115.16-.228.35-.34.18-.104.37-.173.57-.208.21-.035.42-.04.64-.016.22.021.44.071.65.148.23.075.44.172.65.292.32.187.55.377.68.572.14.197.21.397.2.6l-.7-.012c.01-.053 0-.113-.01-.18a.413.413 0 00-.08-.216.986.986 0 00-.2-.244c-.1-.085-.22-.173-.38-.264-.28-.163-.54-.26-.79-.292-.25-.029-.46.009-.65.116a.6.6 0 00-.19.164.243.243 0 000 .168c.03.056.06.112.12.168.06.056.12.111.18.164l.48.372c.11.085.22.179.33.28.11.101.19.208.24.32.05.109.05.221.01.336-.03.117-.15.232-.34.344-.36.205-.77.284-1.24.236a3.43 3.43 0 01-1.39-.464zm4.16 2.306c-.27-.157-.4-.317-.37-.48.03-.16.16-.309.4-.448l2.29-1.32-1.2-.688.48-.272.88.512c.12.07.23.104.32.104.1 0 .21-.034.33-.104l.94-.54.53.308-1.26.728 1.63.94-.47.272-1.63-.94-2.63 1.52 1.63.94-.48.272-1.39-.804zm3.75 2.263c-.25-.15-.44-.31-.56-.48a.798.798 0 01-.16-.52c.03-.179.11-.356.26-.532.15-.179.37-.35.65-.512.29-.166.59-.292.89-.38.32-.086.63-.134.93-.144.31-.014.61.012.9.076.29.066.56.17.8.312.24.138.41.289.52.452.11.165.16.333.14.504a.936.936 0 01-.23.5c-.14.165-.33.321-.59.468l-.26.152-2.65-1.528-.16.096c-.16.09-.28.189-.37.296a.622.622 0 00-.13.324c0 .112.04.222.12.332.09.109.22.212.38.308.24.138.51.226.79.264.29.037.57.026.86-.032l.13.396a3.243 3.243 0 01-2.26-.352zm3.25-1.916a1.797 1.797 0 00-.5-.196 2.574 2.574 0 00-.57-.064c-.19.002-.38.026-.57.072-.18.045-.35.113-.5.204l-.05.028 2.05 1.184.07-.044c.16-.091.28-.188.36-.292a.581.581 0 00.13-.308.456.456 0 00-.09-.308.998.998 0 00-.33-.276zm-.68 3.302l3.58-2.064.55.32-.58.336.03.016c.12-.029.25-.05.38-.064.14-.016.28-.018.42-.008.14.014.29.042.44.084.14.043.29.107.44.192.37.216.55.459.54.728-.01.267-.23.526-.66.776l-2.3 1.324-.55-.32 2.19-1.268c.33-.189.5-.37.52-.544.02-.176-.11-.344-.39-.504a1.91 1.91 0 00-.37-.164 1.936 1.936 0 00-.41-.092 1.522 1.522 0 00-.41.008c-.14.022-.27.066-.38.132l-2.48 1.432-.56-.32zm9.93.695c-.16-.094-.24-.178-.24-.252.01-.078.06-.146.16-.204l.11-.064c.1-.059.22-.088.35-.088.13-.003.28.042.44.136.16.093.24.178.24.256 0 .074-.05.141-.16.2l-.11.064a.729.729 0 01-.35.092c-.13 0-.27-.047-.44-.14zm-5.46 1.344l1.29.744 2.64-1.52-1.29-.744.47-.272 1.84 1.064-3.1 1.792 1.2.696-.47.272-3.05-1.76.47-.272zm3.42 2.518l3.58-2.064.55.32-.58.336.03.016c.12-.029.25-.051.39-.064a2.082 2.082 0 011.29.268c.38.216.56.459.54.728-.01.267-.23.525-.66.776l-2.3 1.324-.55-.32 2.2-1.268c.32-.189.5-.371.51-.544.02-.176-.11-.344-.39-.504a1.852 1.852 0 00-.37-.164 1.992 1.992 0 00-.4-.092 1.597 1.597 0 00-.42.008c-.14.021-.27.065-.38.132l-2.48 1.432-.56-.32zm6.75 4.367c-.36.208-.78.274-1.25.2-.47-.072-1.01-.282-1.61-.628-.58-.334-.92-.618-1.02-.852-.1-.232 0-.431.28-.596.2-.112.4-.17.61-.172.2-.003.43.034.66.112l.08-.048a.324.324 0 01-.04-.248c.03-.078.1-.151.22-.22a.989.989 0 01.59-.136c.22.018.45.068.68.148l.02-.016c-.12-.184-.15-.367-.09-.548.07-.179.23-.342.49-.488a2.2 2.2 0 01.59-.232c.22-.051.44-.072.67-.064a2.951 2.951 0 011.36.384c.27.154.45.318.56.492l.06-.036c.14-.08.29-.128.44-.144.16-.016.32.021.48.112l.65.38-.48.28-.8-.464-.25.14a.58.58 0 01-.09.4c-.09.128-.22.246-.41.356-.18.104-.38.18-.61.228-.21.05-.44.073-.67.068a2.936 2.936 0 01-.69-.112 2.884 2.884 0 01-.66-.276c-.06-.035-.11-.07-.17-.104-.05-.035-.09-.071-.14-.108a2.027 2.027 0 00-.47-.12 1.022 1.022 0 00-.24-.004.513.513 0 00-.21.064c-.11.061-.13.133-.06.216.08.08.2.169.37.268l.79.456c.46.266.71.51.74.732.04.218-.09.412-.38.58zm-.55-.284c.15-.083.2-.183.18-.3-.04-.115-.2-.255-.48-.42l-1.24-.716c-.34-.083-.62-.059-.85.072-.15.09-.23.204-.21.34.01.138.16.292.45.46l.54.312c.32.186.62.302.91.348.27.048.51.016.7-.096zm.75-1.944c.28.16.55.24.8.24.27.002.51-.058.72-.18l.2-.116c.21-.123.31-.259.3-.408 0-.15-.13-.304-.41-.464-.28-.16-.55-.24-.81-.24-.25-.003-.48.057-.7.18l-.2.116c-.21.122-.32.258-.32.408 0 .149.14.304.42.464zm6.21 5.552c-.25-.144-.43-.3-.55-.468a.813.813 0 01-.14-.512c.03-.176.12-.35.27-.524.16-.176.38-.346.67-.512a3.988 3.988 0 011.79-.536c.31-.013.6.012.89.076.29.067.56.172.81.316.25.144.43.299.54.464.12.168.16.34.13.516a.937.937 0 01-.26.528c-.16.176-.38.346-.66.508a3.85 3.85 0 01-.89.384c-.3.088-.6.139-.91.152-.3.014-.6-.013-.89-.08a2.893 2.893 0 01-.8-.312zm.48-.276c.31.179.65.27 1.02.272.38.003.76-.108 1.15-.332l.51-.296c.39-.224.58-.444.57-.66 0-.216-.16-.413-.47-.592a2.047 2.047 0 00-1.02-.272c-.38-.002-.76.108-1.15.332l-.51.296c-.39.224-.58.444-.57.66 0 .216.16.414.47.592zm2.15 1.699l3.57-2.064.56.32-.58.336.02.016c.13-.03.26-.051.39-.064.14-.016.28-.019.42-.008a2.178 2.178 0 01.88.276c.37.216.55.458.54.728-.01.266-.23.525-.67.776l-2.29 1.324-.55-.32 2.19-1.268c.33-.19.5-.371.52-.544.01-.176-.12-.344-.39-.504a2.147 2.147 0 00-.78-.256 1.475 1.475 0 00-.41.008 1.14 1.14 0 00-.39.132l-2.48 1.432-.55-.32zm5.28 3.122c-.19-.109-.28-.209-.28-.3 0-.088.07-.166.19-.236l.12-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.11.28.208.28.296 0 .091-.06.171-.18.24l-.13.072a.807.807 0 01-.41.104c-.16.003-.33-.05-.52-.16zm2.75-1.584c-.19-.109-.29-.209-.29-.3.01-.088.07-.166.19-.236l.12-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.11.28.208.28.296 0 .091-.06.171-.18.24l-.12.072a.818.818 0 01-.42.104c-.15.003-.32-.05-.51-.16zm8.94 2.337l.55.32-2.13 1.232.02.016a3.3 3.3 0 01.39-.064c.14-.016.28-.019.42-.008a2.178 2.178 0 01.88.276c.37.216.55.459.54.728-.01.267-.23.525-.67.776l-2.29 1.324-.55-.32 2.19-1.268c.33-.189.5-.371.51-.544.02-.176-.11-.344-.38-.504a2.147 2.147 0 00-.78-.256 1.597 1.597 0 00-.42.008c-.13.021-.26.065-.38.132l-2.48 1.432-.55-.32 5.13-2.96zm.39 6.147c-.27-.158-.4-.318-.38-.48.03-.16.17-.31.41-.448l2.28-1.32-1.19-.688.47-.272.89.512c.12.069.22.104.32.104s.21-.035.33-.104l.93-.54.54.308-1.26.728 1.63.94-.48.272-1.62-.94-2.64 1.52 1.63.94-.47.272-1.39-.804zm3.94 2.278c-.27-.157-.39-.317-.37-.48.03-.16.16-.309.4-.448l2.29-1.32-1.19-.688.47-.272.88.512c.12.069.23.104.32.104.1 0 .22-.035.34-.104l.93-.54.53.308-1.26.728 1.63.94-.47.272-1.63-.94-2.63 1.52 1.63.94-.47.272-1.4-.804zm5.93-.706l.56.32-.59.336.03.016c.68-.122 1.27-.038 1.77.252.44.254.62.546.53.876-.08.334-.41.671-1 1.012-.59.342-1.18.535-1.76.58-.57.048-1.07-.054-1.51-.308-.51-.29-.65-.63-.44-1.02l-.03-.016-1.96 1.136-.56-.32 4.96-2.864zm-1.7 2.676c.33.187.67.275 1.04.264.38-.01.73-.109 1.06-.296l.61-.352c.32-.186.49-.388.5-.604.03-.216-.12-.417-.45-.604a2.004 2.004 0 00-.84-.26 1.692 1.692 0 00-.43.016c-.13.024-.26.071-.38.14l-1.29.744c-.12.07-.2.144-.24.224a.357.357 0 00-.03.248c.02.083.07.166.15.248.08.083.18.16.3.232zm3.43 2.523c-.19-.109-.28-.209-.28-.3 0-.088.06-.167.18-.236l.13-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.109.28.208.27.296 0 .091-.06.171-.18.24l-.12.072a.828.828 0 01-.42.104c-.15.003-.32-.051-.51-.16zm2.75-1.584c-.19-.109-.29-.209-.29-.3.01-.088.07-.167.19-.236l.12-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.109.28.208.28.296 0 .091-.06.171-.18.24l-.13.072a.817.817 0 01-.41.104.984.984 0 01-.51-.16zm-1.15 3.538l8.63-2.2.5.288-8.63 2.2-.5-.288zm3.95 2.279l8.63-2.2.5.288-8.64 2.2-.49-.288zm4.86 1.706l.51-.292 1.38.8 3.91-2.252-.05-.028-2.36-.048.03-.408 2.48.048.91.524-4.33 2.5 1.27.736-.5.292-3.25-1.872zm5.36 3.187c-.3-.171-.5-.35-.6-.536a.674.674 0 01-.03-.588c.07-.203.23-.412.47-.628.25-.216.57-.439.97-.668.39-.227.77-.411 1.15-.552.38-.144.74-.238 1.09-.28.35-.043.69-.035 1.01.024.33.056.64.169.94.34.29.17.49.35.59.54a.7.7 0 01.04.584c-.08.202-.24.413-.49.632-.24.216-.56.437-.95.664-.4.229-.79.414-1.16.556a4.69 4.69 0 01-1.09.276c-.35.042-.69.036-1.02-.02a2.83 2.83 0 01-.92-.344zm.5-.292c.2.112.4.186.61.224.22.034.44.036.66.004.23-.03.46-.088.69-.176.24-.091.49-.207.73-.348l.79-.456c.24-.139.44-.278.6-.416.15-.139.26-.274.31-.404a.416.416 0 00-.02-.376c-.06-.126-.18-.244-.38-.356-.19-.112-.4-.186-.61-.22a2.15 2.15 0 00-.66-.012c-.22.032-.45.093-.69.184-.25.09-.49.205-.73.344l-.79.456c-.24.141-.44.281-.6.42a1.28 1.28 0 00-.31.396c-.05.13-.05.258.01.384.07.122.2.24.39.352zm1.59-.916c-.16-.094-.24-.178-.24-.252 0-.072.05-.135.14-.188l.15-.088c.1-.054.2-.082.33-.084.13 0 .27.046.44.14.16.093.24.176.23.248 0 .074-.04.138-.14.192l-.15.088a.64.64 0 01-.33.08.84.84 0 01-.43-.136zm1.87 3.474c-.19-.109-.28-.209-.28-.3 0-.088.07-.167.19-.236l.12-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.109.28.208.28.296 0 .091-.06.171-.18.24l-.13.072a.817.817 0 01-.41.104c-.16.003-.33-.051-.52-.16zm3.93 2.291c-.3-.171-.5-.35-.6-.536a.71.71 0 01-.03-.588c.07-.203.23-.412.48-.628.24-.216.56-.439.96-.668a7.88 7.88 0 011.15-.552c.38-.144.74-.238 1.09-.28.36-.043.69-.035 1.02.024.32.056.64.169.93.34.3.17.49.35.59.54.1.186.12.381.04.584-.07.202-.23.413-.48.632-.25.216-.57.437-.96.664-.4.229-.78.414-1.16.556-.37.141-.73.233-1.08.276-.36.042-.69.036-1.02-.02a2.8 2.8 0 01-.93-.344zm.5-.292c.2.112.4.186.61.224.22.034.44.036.66.004.23-.03.46-.088.7-.176.24-.091.48-.207.72-.348l.79-.456c.24-.139.44-.278.6-.416.16-.139.26-.274.31-.404a.415.415 0 00-.01-.376c-.06-.126-.19-.244-.38-.356-.2-.112-.4-.186-.62-.22a2.137 2.137 0 00-.66-.012c-.22.032-.45.093-.69.184-.24.09-.48.205-.72.344l-.79.456a3.69 3.69 0 00-.61.42 1.28 1.28 0 00-.31.396c-.05.13-.04.258.02.384.06.122.19.24.38.352zm1.59-.916c-.16-.094-.24-.178-.24-.252 0-.072.05-.135.14-.188l.16-.088a.64.64 0 01.32-.084c.13 0 .28.046.44.14.16.093.24.176.23.248 0 .074-.04.138-.13.192l-.16.088a.64.64 0 01-.33.08.868.868 0 01-.43-.136zm1.88 3.474c-.19-.109-.29-.209-.29-.3.01-.088.07-.167.19-.236l.12-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.109.28.208.28.296 0 .091-.06.171-.18.24l-.13.072a.79.79 0 01-.41.104c-.15.003-.32-.051-.51-.16zm3.92 2.29c-.29-.17-.49-.349-.59-.536a.71.71 0 01-.04-.588c.08-.202.23-.412.48-.628.24-.216.57-.438.96-.668.39-.226.78-.41 1.15-.552.38-.144.75-.237 1.1-.28.35-.042.69-.034 1.01.024.33.056.64.17.93.34.3.171.5.351.59.54.1.187.12.382.04.584-.07.203-.23.414-.48.632-.25.216-.56.438-.96.664-.39.23-.78.415-1.15.556-.38.142-.74.234-1.09.276a3.51 3.51 0 01-1.02-.02 2.923 2.923 0 01-.93-.344zm.51-.292c.19.112.39.187.61.224.21.035.43.036.66.004.22-.029.45-.088.69-.176.24-.09.48-.206.73-.348l.79-.456c.24-.138.43-.277.59-.416.16-.138.26-.273.31-.404a.415.415 0 00-.01-.376c-.06-.125-.19-.244-.38-.356-.2-.112-.4-.185-.62-.22a2.2 2.2 0 00-.66-.012c-.22.032-.45.094-.69.184-.24.091-.48.206-.72.344l-.79.456c-.24.142-.45.282-.6.42-.16.136-.26.268-.31.396a.432.432 0 00.01.384c.06.123.19.24.39.352zm1.58-.916c-.16-.093-.24-.177-.24-.252.01-.072.05-.134.15-.188l.15-.088c.09-.053.2-.081.33-.084a.9.9 0 01.43.14c.16.094.24.176.24.248 0 .075-.05.139-.14.192l-.15.088c-.1.054-.21.08-.34.08-.12.003-.26-.042-.43-.136zm1.88 3.475c-.19-.11-.29-.21-.29-.3.01-.088.07-.167.19-.236l.13-.072c.12-.07.25-.106.41-.108.15 0 .33.054.51.164.19.109.29.208.28.296 0 .09-.06.17-.18.24l-.12.072a.828.828 0 01-.42.104c-.15.002-.32-.051-.51-.16zm2.52 1.382l.5-.292 1.39.8 3.9-2.252-.05-.028-2.35-.048.02-.408 2.48.048.91.524-4.33 2.5 1.28.736-.51.292-3.24-1.872zm5.35 3.187c-.29-.171-.49-.35-.6-.536a.75.75 0 01-.03-.588c.07-.203.23-.412.48-.628.24-.216.56-.439.96-.668a7.88 7.88 0 011.15-.552c.38-.144.75-.238 1.1-.28a3.34 3.34 0 011.01.024c.33.056.64.169.93.34.3.17.49.35.59.54.1.186.12.381.04.584-.07.202-.23.413-.48.632-.25.216-.57.437-.96.664-.39.229-.78.414-1.15.556a4.82 4.82 0 01-1.09.276c-.35.042-.69.036-1.02-.02a2.972 2.972 0 01-.93-.344zm.51-.292c.19.112.39.186.61.224.21.034.43.036.65.004.23-.03.46-.088.7-.176.24-.091.48-.207.72-.348l.79-.456c.24-.139.44-.278.6-.416.16-.139.26-.274.31-.404a.415.415 0 00-.01-.376c-.06-.126-.19-.244-.38-.356-.2-.112-.4-.186-.62-.22a2.137 2.137 0 00-.66-.012c-.22.032-.45.093-.69.184-.24.09-.48.205-.72.344l-.79.456c-.25.141-.45.281-.6.42a1.19 1.19 0 00-.32.396c-.05.13-.04.258.02.384.06.122.19.24.39.352zm1.58-.916c-.16-.094-.24-.178-.24-.252.01-.072.05-.135.15-.188l.15-.088a.64.64 0 01.32-.084c.13 0 .28.046.44.14.16.093.24.176.24.248 0 .074-.05.138-.14.192l-.15.088c-.1.053-.21.08-.34.08a.868.868 0 01-.43-.136zm1.88 3.474c-.19-.109-.29-.209-.29-.3.01-.088.07-.167.19-.236l.13-.072a.813.813 0 01.4-.108c.16 0 .33.055.52.164.19.109.29.208.28.296 0 .091-.06.171-.18.24l-.12.072a.828.828 0 01-.42.104c-.15.003-.32-.051-.51-.16zm2.74-1.584c-.19-.109-.28-.209-.28-.3 0-.088.06-.167.18-.236l.13-.072a.851.851 0 01.41-.108c.16 0 .33.055.52.164.19.109.28.208.27.296 0 .091-.06.171-.18.24l-.12.072a.828.828 0 01-.42.104c-.15.003-.32-.051-.51-.16zm3.84 2.099c.34.194.67.297.98.308.32.01.6-.052.84-.188l.05-.028c.26-.15.37-.31.33-.48-.03-.168-.18-.328-.44-.48-.26-.15-.53-.238-.81-.264a3.128 3.128 0 00-.83.032l-.1-.444c.15-.022.32-.034.5-.036a3.445 3.445 0 011.15.16c.21.064.41.153.61.268.2.12.37.248.5.384.12.133.2.269.23.408.03.136.01.269-.07.4-.07.133-.21.256-.4.368a2.228 2.228 0 01-1.03.272c-.17.005-.35-.007-.53-.036-.18-.03-.35-.072-.51-.128l-.03.016c.11.093.19.194.25.304.06.106.09.217.09.332 0 .112-.04.225-.13.34-.08.114-.21.224-.39.328-.21.12-.44.206-.7.26-.25.053-.51.073-.78.06-.27-.014-.54-.06-.81-.14a3.391 3.391 0 01-.79-.332 2.342 2.342 0 01-.49-.368c-.12-.12-.2-.24-.25-.36a.867.867 0 01-.07-.344c0-.11.02-.216.05-.32l.77.06a1.4 1.4 0 00-.06.268c-.01.085 0 .17.03.256.03.085.09.17.18.256.08.085.2.172.35.26.34.197.68.302 1.02.316.34.016.66-.06.95-.228l.05-.032c.29-.166.42-.346.4-.54-.02-.192-.21-.391-.56-.596l-.58-.332.5-.288.53.308zm1.29 4.054c-.3-.171-.49-.349-.6-.536a.75.75 0 01-.03-.588c.07-.203.23-.412.48-.628.24-.216.56-.439.96-.668a7.88 7.88 0 011.15-.552c.38-.144.74-.237 1.1-.28a3.34 3.34 0 011.01.024c.32.056.64.169.93.34.3.171.49.351.59.54.1.187.12.381.04.584-.07.203-.23.413-.48.632-.25.216-.57.437-.96.664-.4.229-.78.415-1.16.556-.37.141-.73.233-1.08.276a3.51 3.51 0 01-1.02-.02 2.86 2.86 0 01-.93-.344zm.51-.292c.19.112.39.187.61.224.21.035.43.036.65.004.23-.029.46-.088.7-.176.24-.091.48-.207.72-.348l.79-.456c.24-.139.44-.277.6-.416.16-.139.26-.273.31-.404a.415.415 0 00-.01-.376c-.06-.125-.19-.244-.38-.356-.2-.112-.4-.185-.62-.22a2.2 2.2 0 00-.66-.012c-.22.032-.45.093-.69.184-.24.091-.48.205-.72.344l-.79.456c-.25.141-.45.281-.6.42a1.19 1.19 0 00-.32.396.468.468 0 00.02.384c.06.123.19.24.39.352zm1.58-.916c-.16-.093-.24-.177-.24-.252 0-.072.05-.135.15-.188l.15-.088c.09-.053.2-.081.32-.084.13 0 .28.047.44.14.16.093.24.176.24.248 0 .075-.05.139-.14.192l-.16.088a.64.64 0 01-.33.08.858.858 0 01-.43-.136zm1.86 3.486c-.3-.17-.5-.349-.6-.536a.674.674 0 01-.03-.588c.07-.202.23-.412.47-.628.25-.216.57-.438.97-.668.39-.226.77-.41 1.15-.552.38-.144.74-.237 1.09-.28.35-.042.69-.034 1.01.024.33.056.64.17.94.34.29.171.49.351.59.54.1.187.11.382.04.584-.07.203-.24.414-.49.632-.24.216-.56.438-.95.664-.4.23-.79.415-1.16.556-.37.142-.74.234-1.09.276a3.51 3.51 0 01-1.02-.02 2.785 2.785 0 01-.92-.344zm.5-.292c.2.112.4.187.61.224.22.035.44.036.66.004.23-.029.46-.088.69-.176.24-.09.49-.206.73-.348l.79-.456c.24-.138.44-.277.6-.416.15-.138.26-.273.31-.404a.416.416 0 00-.02-.376c-.06-.125-.18-.244-.38-.356-.19-.112-.4-.185-.61-.22a2.213 2.213 0 00-.66-.012c-.22.032-.45.094-.69.184-.25.091-.49.206-.73.344l-.79.456c-.24.142-.44.282-.6.42a1.28 1.28 0 00-.31.396.467.467 0 00.01.384c.07.123.2.24.39.352zm1.59-.916c-.16-.093-.24-.177-.24-.252 0-.072.05-.134.14-.188l.15-.088c.1-.053.2-.081.33-.084.13 0 .27.047.44.14.16.094.24.176.23.248 0 .075-.04.139-.14.192l-.15.088a.63.63 0 01-.33.08c-.13.003-.27-.042-.43-.136zm1.85 3.487c-.29-.171-.49-.349-.59-.536a.71.71 0 01-.04-.588c.08-.203.24-.412.48-.628.25-.216.57-.439.96-.668.4-.227.78-.411 1.15-.552.38-.144.75-.237 1.1-.28.35-.043.69-.035 1.01.024.33.056.64.169.93.34.3.171.5.351.59.54.11.187.12.381.05.584-.08.203-.24.413-.49.632-.24.216-.56.437-.96.664-.39.229-.78.415-1.15.556a4.82 4.82 0 01-1.09.276 3.51 3.51 0 01-1.02-.02 2.947 2.947 0 01-.93-.344zm.51-.292c.19.112.4.187.61.224.22.035.43.036.66.004.22-.029.45-.088.69-.176.24-.091.48-.207.73-.348l.79-.456c.24-.139.44-.277.59-.416.16-.139.26-.273.31-.404a.415.415 0 00-.01-.376c-.06-.125-.19-.244-.38-.356-.19-.112-.4-.185-.62-.22a2.2 2.2 0 00-.66-.012c-.22.032-.45.093-.69.184-.24.091-.48.205-.72.344l-.79.456c-.24.141-.44.281-.6.42-.15.136-.26.268-.31.396a.467.467 0 00.01.384c.07.123.19.24.39.352zm1.58-.916c-.16-.093-.24-.177-.24-.252.01-.072.06-.135.15-.188l.15-.088c.09-.053.2-.081.33-.084.13 0 .27.047.43.14.16.093.24.176.24.248 0 .075-.05.139-.14.192l-.15.088c-.1.053-.21.08-.34.08-.12.003-.26-.043-.43-.136zm-.47 3.15l8.63-2.2.5.288-8.63 2.2-.5-.288z"
            ></path>
          </g>
        </motion.g>
        <motion.g
          id="nextLogo"
          variants={animateIn("right", 1, 2)}
          initial="from"
          animate="toOffset"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            d="M1244.46 81.504l79.51 45.76 29.37-16.803-79.51-45.76-29.37 16.803z"
            opacity="0.15"
          ></path>
          <path
            fill="#59B5F8"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1244.46 61.803l79.51 45.759 29.37-16.802L1273.83 45l-29.37 16.803z"
          ></path>
          <path
            fill="#87D9FD"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1323.97 119.34v-11.778l29.37-16.802v11.777l-29.37 16.803z"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M1244.46 61.803l79.51 45.76v11.777l-79.51-45.76V61.803z"
          ></path>
          <g fill="#000">
            <path d="M1314.2 77.826l9.53 5.503-1.76 1.015-3.78-2.182-9.25 5.343-1.89-1.091 9.25-5.343-3.86-2.229 1.76-1.016zm-15.68-9.051l-1.76 1.016-7.64-4.41-2.83 1.634 6.15 3.547-1.76 1.016-6.15-3.547-2.9 1.678 7.64 4.41-1.76 1.016-9.53-5.502 11.01-6.36 9.54 5.503h-.01zm4.76 2.752l-2.47-1.428-2.16 11.475 2.48 1.433 1.08-5.736 9.92-.623-2.48-1.427-7.15.446.78-4.14zm-5.33 6.007l.3-1.605-8.47.529 2.48 1.433 5.69-.357z"></path>
            <path
              fillRule="evenodd"
              d="M1278.04 69.671l2.15-11.484-2.36-1.365-11.02 6.36 1.89 1.09 8.66-5-1.69 9.027 2.37 1.372z"
              clipRule="evenodd"
            ></path>
            <path d="M1313.21 89.894c-.14-.08-.21-.177-.21-.288 0-.112.07-.208.2-.286a.97.97 0 01.49-.115c.2.002.37.042.5.121.14.08.2.173.21.285 0 .113-.06.208-.2.286a.84.84 0 01-.32.103c-.12.016-.24.016-.36-.004a.85.85 0 01-.31-.103zm8.7-.333l-3.23 1.864c-.29.172-.61.28-.95.331a3.07 3.07 0 01-1.98-.374c-.27-.157-.47-.328-.59-.509-.12-.18-.15-.364-.08-.547.06-.182.23-.355.51-.52l.84.485c-.12.072-.2.15-.24.234a.271.271 0 00.02.246c.05.084.14.162.26.233.13.078.28.128.43.15.15.02.3.014.46-.02.16-.036.32-.1.49-.193l3.22-1.864.84.484zm2.19 2.719c.17-.125.24-.265.19-.418-.05-.155-.2-.303-.45-.447a1.894 1.894 0 00-.53-.216 1.607 1.607 0 00-.5-.044c-.16.013-.29.053-.41.118-.1.055-.16.117-.18.183a.253.253 0 000 .208c.03.072.07.146.14.219.06.074.12.144.2.212l.33.315c.13.124.25.254.34.388.1.133.16.268.18.403a.56.56 0 01-.07.396c-.07.128-.21.251-.41.366a2.25 2.25 0 01-.91.29c-.35.035-.71.012-1.08-.074a3.99 3.99 0 01-1.13-.451c-.37-.216-.62-.423-.78-.64-.15-.217-.2-.43-.14-.639.07-.21.24-.405.54-.587l.83.48c-.15.098-.23.204-.25.316-.02.112.02.225.11.336.09.112.22.22.39.32.18.101.38.183.57.233.19.049.38.067.55.056.18-.01.34-.054.47-.128.12-.07.18-.149.19-.234a.5.5 0 00-.1-.282 2.432 2.432 0 00-.29-.335l-.4-.383c-.28-.278-.44-.538-.46-.78-.03-.244.12-.46.45-.65.27-.155.59-.249.94-.28a3.48 3.48 0 011.08.078c.37.083.72.22 1.05.408.32.188.56.39.7.6.13.209.17.413.12.61-.06.196-.21.371-.47.523l-.81-.47z"></path>
          </g>
        </motion.g>
        <motion.g
          id="tailwindLogo"
          variants={animateIn("left", 1, 2)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            fillRule="evenodd"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M110.021 452.796c-7.276-4.2-15.461-4.725-24.555-1.575 6.366-.525 10.913.525 13.641 3.151 1.556 1.493 1.536 3.22 1.516 5.134-.04 3.115-.091 6.715 6.669 10.618 7.276 4.2 15.461 4.726 24.555 1.575-6.366.525-10.913-.525-13.641-3.15-1.556-1.494-1.536-3.221-1.516-5.134.04-3.116.091-6.715-6.669-10.619zm-34.008 0c-7.276-4.2-15.46-4.725-24.555-1.575 6.366-.525 10.913.525 13.641 3.151 1.557 1.493 1.536 3.22 1.516 5.134-.04 3.115-.09 6.715 6.67 10.618 7.275 4.2 15.46 4.726 24.555 1.575-6.367.525-10.914-.525-13.642-3.15-1.556-1.494-1.536-3.221-1.516-5.134.04-3.116.091-6.715-6.67-10.619z"
            clipRule="evenodd"
            opacity="0.15"
          ></path>
          <path
            fill="#3BBB96"
            fillRule="evenodd"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M110.021 433.876c-7.276-4.2-15.461-4.726-24.555-1.575 6.366-.525 10.913.525 13.641 3.15 1.556 1.494 1.536 3.221 1.516 5.134-.04 3.116-.091 6.715 6.669 10.618 7.112 4.106 15.093 4.701 23.943 1.783.135-.045.065-.165-.09-.155-5.999.392-10.312-.675-12.939-3.203-1.556-1.493-1.536-3.22-1.516-5.134.04-3.115.091-6.715-6.669-10.618z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M99.206 449.351c-2.728-2.625-7.41-3.675-13.776-3.15l.132-13.533a.463.463 0 01.43-.458c6.144-.445 10.549.617 13.216 3.183 1.554 1.492 1.536 3.216 1.516 5.127v.205c-.041 3.114-.085 6.521 6.669 10.42 7.276 4.201 15.461 4.726 24.555 1.575l-.002 13.959c-9.094 3.15-17.279 2.625-24.555-1.576-6.756-3.901-6.71-7.498-6.669-10.613v-.012c.02-1.911.038-3.635-1.516-5.127z"
          ></path>
          <path
            fill="#75DCC0"
            d="M99.206 449.351c-2.728-2.625-7.41-3.675-13.776-3.15l.132-13.474a.464.464 0 01.43-.459c6.144-.444 10.549.617 13.216 3.183 1.554 1.492 1.536 3.348 1.516 5.259v.007l-.002-.139v12.8c.008.359.004.726 0 1.1v.012-1.112c-.033-1.477-.266-2.827-1.516-4.027z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M85.43 446.201c6.366-.525 11.048.525 13.776 3.15 1.554 1.492 1.536 3.216 1.516 5.127v.012-13.912l.002.139v-.007c.02-1.911.038-3.767-1.516-5.259-2.667-2.566-7.072-3.627-13.216-3.183a.464.464 0 00-.43.459l-.132 13.474z"
          ></path>
          <path
            fill="#3BBB96"
            fillRule="evenodd"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M76.013 433.876c-7.276-4.2-15.46-4.726-24.555-1.575 6.366-.525 10.913.525 13.641 3.15 1.557 1.494 1.536 3.221 1.516 5.134-.04 3.116-.09 6.715 6.67 10.618 7.111 4.106 15.092 4.701 23.942 1.783.135-.045.065-.165-.09-.155-6 .392-10.312-.675-12.94-3.203-1.555-1.493-1.535-3.22-1.515-5.134.04-3.115.091-6.715-6.67-10.618z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M65.198 449.351c-2.728-2.625-7.41-3.675-13.776-3.15l.132-13.533a.463.463 0 01.43-.458c6.144-.445 10.55.617 13.216 3.183 1.555 1.492 1.536 3.216 1.516 5.127v.205c-.04 3.114-.085 6.521 6.67 10.42 7.275 4.201 15.46 4.726 24.555 1.575l-.002 13.959c-9.095 3.15-17.28 2.625-24.556-1.576-6.756-3.901-6.71-7.498-6.67-10.613l.001-.005v-.007c.02-1.911.038-3.635-1.516-5.127z"
          ></path>
          <g>
            <path
              fill="#75DCC0"
              d="M65.198 449.351c-2.728-2.625-7.41-3.675-13.776-3.15l.132-13.474a.464.464 0 01.43-.459c6.144-.444 10.55.617 13.216 3.183 1.555 1.492 1.536 3.348 1.516 5.259v.007l-.002-.139v12.8c.008.359.004.726 0 1.1v.012-1.112c-.033-1.477-.266-2.827-1.516-4.027z"
            ></path>
            <path
              stroke="#151515"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M51.422 446.201c6.366-.525 11.048.525 13.776 3.15 1.555 1.492 1.536 3.216 1.516 5.127v.012-13.912l.002.139v-.007c.02-1.911.039-3.767-1.516-5.259-2.667-2.566-7.072-3.627-13.216-3.183a.464.464 0 00-.43.459l-.132 13.474z"
            ></path>
          </g>
        </motion.g>
        <motion.g
          id="pinkSlice"
          variants={animateIn("left", 1, 2.2)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            d="M140.976 329.679L19.899 260l-92.844 53.114 121.077 69.679 92.844-53.114z"
            opacity="0.15"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M-73 277.133l121.077 69.678v17.934L-73 295.066v-17.933z"
          ></path>
          <path
            fill="#F97289"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M140.976 293.679L19.899 224l-92.844 53.114 121.077 69.679 92.844-53.114z"
          ></path>
          <path
            fill="#F7A1B0"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M140.977 311.612v-17.934l-92.844 53.114v17.933l92.844-53.113z"
          ></path>
          <g fill="#F7A1B0" stroke="#151515" strokeLinejoin="round">
            <path
              strokeWidth="2"
              d="M65.85 262.18l-44.646-25.506-73.024 42.085 44.646 25.506L65.85 262.18z"
            ></path>
            <path
              strokeWidth="1.5"
              d="M65.85 259.63l-44.646-25.506-73.024 42.085 44.646 25.506L65.85 259.63zm-73.022 42.085l73.024-42.085v2.55l-73.024 42.085v-2.55z"
            ></path>
          </g>
          <path
            fill="#151515"
            stroke="#151515"
            strokeWidth="2"
            d="M72.822 270.062c1.442-.831 3.78-.829 5.218.004l17.762 10.287c1.362.789 1.423 2.053.139 2.884-1.397.904-3.826.945-5.312.089l-17.807-10.261c-1.44-.829-1.44-2.174 0-3.003z"
          ></path>
          <path
            fill="#F7A1B0"
            stroke="#151515"
            strokeWidth="1.5"
            d="M72.822 267.512c1.441-.831 3.78-.829 5.218.003l17.761 10.287c1.363.789 1.424 2.053.14 2.884-1.397.905-3.827.945-5.312.089l-17.807-10.26c-1.44-.83-1.44-2.174 0-3.003z"
          ></path>
          <path
            fill="#151515"
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M72.821 270.515l17.807 10.26v2.551l-17.807-10.261c-.745-.429-1.104-.997-1.077-1.56v-2.426c.028.521.387 1.038 1.077 1.436z"
          ></path>
          <path
            fill="#F7A1B0"
            d="M90.629 280.775c1.485.856 3.915.815 5.312-.089.614-.398.92-.895.924-1.392v-.015 2.566c-.003.497-.31.994-.924 1.391-1.397.905-3.827.945-5.312.089v-2.55z"
          ></path>
          <path
            stroke="#151515"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M95.94 280.686c-1.396.904-3.826.945-5.311.089v2.55c1.485.856 3.915.816 5.312-.089.614-.397.92-.894.924-1.391v-2.566c.003.502-.303 1.005-.924 1.407z"
          ></path>
          <g stroke="#151515" strokeLinejoin="round" strokeWidth="1.5">
            <path
              fill="#F7A1B0"
              d="M60.682 274.524c1.441-.83 3.779-.829 5.218.003l37.854 21.871c1.314.759 1.427 1.967.261 2.803-1.361.976-3.891 1.055-5.428.17l-37.905-21.842c-1.44-.829-1.44-2.175 0-3.005z"
            ></path>
            <path
              fill="#F7A1B0"
              d="M60.682 274.524c1.441-.83 3.779-.829 5.218.003l37.854 21.871c1.314.759 1.427 1.967.261 2.803-1.361.976-3.891 1.055-5.428.17l-37.905-21.842c-1.44-.829-1.44-2.175 0-3.005z"
            ></path>
            <path
              fill="#151515"
              d="M60.682 277.529l37.905 21.842v.82a1 1 0 01-1.499.866L60.682 280.08c-.73-.42-1.09-.973-1.08-1.523v-2.51c.009.537.369 1.073 1.08 1.482z"
            ></path>
            <path
              fill="#F7A1B0"
              d="M98.586 299.371c1.536.886 4.066.806 5.427-.17.538-.385.804-.849.805-1.312v2.55c-.001.463-.267.928-.805 1.313-1.361.976-3.891 1.055-5.427.17v-2.551z"
            ></path>
          </g>
          <g stroke="#151515" strokeLinejoin="round" strokeWidth="1.5">
            <path
              fill="#F7A1B0"
              d="M48.541 281.539c1.442-.831 3.78-.83 5.219.002l37.853 21.871c1.314.76 1.427 1.967.261 2.803-1.36.976-3.89 1.056-5.427.17L48.54 284.544c-1.44-.83-1.44-2.175 0-3.005z"
            ></path>
            <path
              fill="#F7A1B0"
              d="M48.541 281.539c1.442-.831 3.78-.83 5.219.002l37.853 21.871c1.314.76 1.427 1.967.261 2.803-1.36.976-3.89 1.056-5.427.17L48.54 284.544c-1.44-.83-1.44-2.175 0-3.005z"
            ></path>
            <path
              fill="#151515"
              d="M48.541 284.544l37.906 21.841v2.551L48.54 287.094c-.73-.42-1.09-.972-1.08-1.523v-2.509c.01.537.37 1.072 1.08 1.482z"
            ></path>
            <path
              fill="#F7A1B0"
              d="M86.445 306.386c1.537.885 4.067.806 5.428-.17.537-.386.803-.85.805-1.313v2.551c-.002.463-.268.927-.805 1.312-1.361.976-3.891 1.056-5.428.17v-2.55z"
            ></path>
          </g>
          <g stroke="#151515" strokeLinejoin="round" strokeWidth="1.5">
            <path
              fill="#F7A1B0"
              d="M34.486 288.553c1.442-.83 3.78-.829 5.219.002l37.853 21.872c1.315.759 1.427 1.967.261 2.803-1.36.976-3.89 1.055-5.427.17l-37.906-21.842c-1.44-.83-1.44-2.175 0-3.005z"
            ></path>
            <path
              fill="#F7A1B0"
              d="M34.486 288.553c1.442-.83 3.78-.829 5.219.002l37.853 21.872c1.315.759 1.427 1.967.261 2.803-1.36.976-3.89 1.055-5.427.17l-37.906-21.842c-1.44-.83-1.44-2.175 0-3.005z"
            ></path>
            <path
              fill="#151515"
              d="M34.486 291.558l37.906 21.841v2.551l-37.906-21.841c-.729-.42-1.089-.973-1.08-1.523v-2.51c.01.537.37 1.072 1.08 1.482z"
            ></path>
            <path
              fill="#F7A1B0"
              d="M72.39 313.4c1.537.885 4.067.806 5.428-.17.538-.385.803-.85.805-1.313v2.551c-.002.463-.267.927-.805 1.313-1.36.976-3.89 1.055-5.427.17V313.4z"
            ></path>
          </g>
        </motion.g>
        <motion.g
          id="organgeSlice"
          variants={animateIn("left", 1, 2.5)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            id="orangeSliceShadow"
            fill="#151515"
            d="M52 175.555l121.077 69.678 34.182-19.554L86.182 156 52 175.555z"
            opacity="0.15"
          ></path>
          <motion.path
            id="orangeSliceTop"
            fill="#EEEEEE"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M52 145.555l121.077 69.678 34.182-19.554L86.182 126 52 145.555z"
            variants={changeColor("#ED6B22", 8.5)}
            initial="from"
            animate="to"
          ></motion.path>
          <path
            id="orangeSliceLong"
            fill="#151515"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M52 145.555l121.077 69.678v17.934L52 163.488v-17.933z"
          ></path>
          <motion.path
            id="orangeSliceShort"
            fill="#FFFFFF"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M173.078 233.166v-17.933l34.182-19.555v17.934l-34.182 19.554z"
            variants={changeColor("#F39A68", 8.5)}
            initial="from"
            animate="to"
          ></motion.path>
          <g id="orangeSliceIntruded" stroke="#151515" strokeWidth="2">
            <path
              fill="#505050"
              d="M169.146 192.94c1.481-.855 3.883-.852 5.358.007l8.938 5.204c1.419.827 1.455 2.152.081 3.003-1.449.898-3.897.923-5.4.055l-8.977-5.183c-1.476-.852-1.476-2.234 0-3.086z"
            ></path>
            <path
              fill="#151515"
              strokeLinejoin="round"
              d="M183.443 200.775l-8.939-5.205v-2.623l8.939 5.204c1.329.775 1.444 1.988.322 2.838a3.332 3.332 0 00-.322-.214z"
            ></path>
            <path
              fill="#fff"
              strokeLinejoin="round"
              d="M174.504 192.947c-1.475-.859-3.877-.862-5.358-.007-1.349.779-1.465 2-.348 2.855a3.09 3.09 0 01.348-.231c1.481-.855 3.883-.852 5.358.006v-2.623z"
            ></path>
            <path
              fill="#505050"
              d="M150.127 181.79c1.48-.855 3.883-.852 5.357.006l8.939 5.205c1.419.826 1.454 2.152.08 3.003-1.448.897-3.897.922-5.399.055l-8.977-5.183c-1.477-.852-1.477-2.234 0-3.086z"
            ></path>
            <path
              fill="#151515"
              strokeLinejoin="round"
              d="M164.423 189.624l-8.939-5.205v-2.623l8.939 5.205c1.33.774 1.445 1.987.323 2.837a3.35 3.35 0 00-.323-.214z"
            ></path>
            <path
              fill="#fff"
              strokeLinejoin="round"
              d="M155.484 181.796c-1.474-.858-3.877-.861-5.357-.006-1.349.778-1.466 2-.349 2.855.105-.081.222-.158.349-.232 1.48-.855 3.883-.852 5.357.007v-2.624z"
            ></path>
            <g>
              <path
                fill="#505050"
                d="M131.107 170.639c1.481-.855 3.883-.852 5.357.007l8.939 5.205c1.419.826 1.455 2.152.081 3.003-1.449.897-3.897.922-5.4.055l-8.977-5.183c-1.476-.853-1.476-2.234 0-3.087z"
              ></path>
              <path
                fill="#151515"
                strokeLinejoin="round"
                d="M145.404 178.474l-8.939-5.205v-2.623l8.939 5.204c1.33.775 1.444 1.988.322 2.838a3.05 3.05 0 00-.322-.214z"
              ></path>
              <path
                fill="#fff"
                strokeLinejoin="round"
                d="M136.464 170.646c-1.474-.859-3.876-.862-5.357-.007-1.349.779-1.465 2-.349 2.855.106-.08.222-.158.349-.231 1.481-.855 3.883-.852 5.357.006v-2.623z"
              ></path>
            </g>
            <g strokeLinejoin="round">
              <path
                fill="#505050"
                d="M82.577 138l37.813 20.661-11.577 6.231L71 144.231 82.577 138z"
              ></path>
              <path
                fill="#fff"
                d="M82.577 138L71 144.231l2.419 1.322 9.158-4.929V138z"
              ></path>
              <path
                fill="#151515"
                d="M120.391 158.661L82.578 138v2.624l35.394 19.339 2.419-1.302z"
              ></path>
            </g>
          </g>
          <g id="orangeSliceExtruded">
            <motion.g
              id="orangeSliceSmall3Exteuded"
              variants={popIn(8.8)}
              initial="from"
              animate="to"
            >
              <path
                fill="#151515"
                stroke="#151515"
                strokeWidth="1.5"
                d="M169.125 192.496c1.479-.852 3.88-.849 5.354.007l8.932 5.191c1.418.824 1.454 2.146.081 2.995-1.448.895-3.895.92-5.396.055l-8.971-5.169c-1.476-.851-1.476-2.229 0-3.079z"
              ></path>
              <path
                fill="#F39A68"
                stroke="#151515"
                strokeWidth="1.5"
                d="M169.125 189.88c1.48-.853 3.88-.85 5.354.006l8.933 5.191c1.418.824 1.453 2.147.08 2.996-1.447.895-3.895.919-5.396.054l-8.971-5.169c-1.475-.85-1.475-2.228 0-3.078z"
              ></path>
              <path
                fill="#151515"
                d="M169.125 192.958l8.971 5.169v2.617l-8.971-5.169c-.741-.427-1.11-.987-1.107-1.547l.003-2.532a1.353 1.353 0 010-.156v.156c.032.531.4 1.057 1.104 1.462z"
              ></path>
              <path
                stroke="#151515"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M178.096 198.127l-8.971-5.169c-.773-.445-1.141-1.035-1.104-1.618l-.003 2.688c-.003.56.366 1.12 1.107 1.547l8.971 5.169v-2.617z"
              ></path>
              <g>
                <path
                  fill="#F39A68"
                  d="M178.097 198.128c1.501.865 3.949.84 5.396-.055.661-.408.996-.927 1.007-1.447v-.053 2.67c-.011.52-.346 1.038-1.007 1.447-1.447.895-3.895.92-5.396.055v-2.617z"
                ></path>
                <path
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M183.493 198.073c-1.447.895-3.895.92-5.396.055v2.617c1.501.865 3.949.84 5.396-.055.661-.409.996-.927 1.007-1.447v-2.67c.011.538-.323 1.078-1.007 1.5z"
                ></path>
              </g>
            </motion.g>
            <motion.g
              id="orangeSliceSmall2Exteuded"
              variants={popIn(8.7)}
              initial="from"
              animate="to"
            >
              <path
                fill="#151515"
                stroke="#151515"
                strokeWidth="2"
                d="M150.118 181.375c1.479-.853 3.88-.85 5.353.006l8.933 5.191c1.418.824 1.454 2.147.081 2.995-1.448.895-3.895.92-5.396.055l-8.971-5.169c-1.476-.85-1.476-2.228 0-3.078z"
              ></path>
              <path
                fill="#F39A68"
                stroke="#151515"
                strokeWidth="1.5"
                d="M150.118 178.758c1.479-.852 3.88-.85 5.353.007l8.933 5.191c1.418.824 1.454 2.146.081 2.995-1.448.895-3.895.92-5.396.055l-8.971-5.169c-1.476-.851-1.476-2.229 0-3.079z"
              ></path>
              <path
                fill="#151515"
                d="M150.118 181.837l8.971 5.169v2.617l-8.971-5.17c-.741-.427-1.11-.987-1.107-1.547l.003-2.531a1.029 1.029 0 010-.157v.157c.032.531.4 1.056 1.104 1.462z"
              ></path>
              <path
                stroke="#151515"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M159.089 187.006l-8.971-5.169c-.773-.446-1.141-1.036-1.104-1.619l-.003 2.688c-.003.56.366 1.12 1.107 1.547l8.971 5.17v-2.617z"
              ></path>
              <g>
                <path
                  fill="#F39A68"
                  d="M159.09 187.006c1.501.866 3.948.841 5.396-.054.661-.409.996-.927 1.006-1.447v-.053a.469.469 0 010 .053v2.617c-.01.519-.345 1.038-1.006 1.446-1.448.895-3.895.92-5.396.055v-2.617z"
                ></path>
                <path
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M164.486 186.952c-1.448.895-3.895.92-5.396.054v2.617c1.501.865 3.948.84 5.396-.055.661-.408.996-.927 1.006-1.446v-2.67c.012.537-.323 1.077-1.006 1.5z"
                ></path>
              </g>
            </motion.g>
            <motion.g
              id="orangeSliceSmall1Exteuded"
              variants={popIn(8.6)}
              initial="from"
              animate="to"
            >
              <path
                fill="#151515"
                stroke="#151515"
                strokeWidth="2"
                d="M131.106 170.254c1.48-.852 3.881-.849 5.354.007l8.933 5.191c1.418.824 1.454 2.146.081 2.995-1.448.895-3.895.92-5.396.055l-8.972-5.169c-1.475-.85-1.475-2.229 0-3.079z"
              ></path>
              <path
                fill="#F39A68"
                stroke="#151515"
                strokeWidth="1.5"
                d="M131.106 167.638c1.48-.853 3.881-.85 5.354.006l8.933 5.191c1.418.824 1.454 2.146.081 2.995-1.448.895-3.895.92-5.396.055l-8.972-5.169c-1.475-.85-1.475-2.228 0-3.078z"
              ></path>
              <path
                fill="#151515"
                d="M131.106 170.716l8.972 5.17v2.616l-8.972-5.169c-.741-.427-1.109-.987-1.106-1.547l.002-2.532a1.16 1.16 0 01.001-.156l-.001.156c.033.531.401 1.057 1.104 1.462z"
              ></path>
              <path
                stroke="#151515"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M140.078 175.886l-8.972-5.17c-.772-.445-1.14-1.035-1.103-1.618l-.003 2.688c-.003.56.365 1.12 1.106 1.547l8.972 5.169v-2.616z"
              ></path>
              <g>
                <path
                  fill="#F39A68"
                  d="M140.079 175.886c1.501.865 3.948.84 5.396-.055.661-.409.995-.927 1.006-1.447v-.053a.468.468 0 010 .053v2.617c-.011.52-.345 1.038-1.006 1.447-1.448.895-3.895.92-5.396.054v-2.616z"
                ></path>
                <path
                  stroke="#151515"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M145.475 175.831c-1.448.895-3.895.92-5.396.055v2.616c1.501.866 3.948.841 5.396-.054.661-.409.995-.927 1.006-1.447v-2.67c.012.538-.323 1.077-1.006 1.5z"
                ></path>
              </g>
            </motion.g>
            <motion.g
              id="orangeSliceLargeExteuded"
              stroke="#151515"
              strokeLinejoin="round"
              variants={popIn(8.5)}
              initial="from"
              animate="to"
            >
              <path
                fill="#F39A68"
                strokeWidth="2"
                d="M82.602 138.076l37.896 20.665-11.602 6.232L71 144.308l11.602-6.232z"
              ></path>
              <path
                fill="#F39A68"
                strokeWidth="1.5"
                d="M82.602 135.452l37.896 20.665-11.602 6.232L71 141.684l11.602-6.232z"
              ></path>
              <path
                fill="#151515"
                strokeWidth="1.5"
                d="M71 141.684l37.896 20.665v2.624L71 144.308v-2.624z"
              ></path>
              <path
                fill="#F39A68"
                strokeWidth="1.5"
                d="M108.898 162.349l11.602-6.232v2.624l-11.602 6.232v-2.624z"
              ></path>
            </motion.g>
          </g>
        </motion.g>
        <motion.g
          id="blueBall"
          variants={animateIn("left", 1, 2.4)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            d="M249.555 108.769c-6.357 3.633-16.664 3.633-23.021 0-6.358-3.632-6.358-9.522 0-13.155 6.357-3.633 16.664-3.633 23.021 0 6.357 3.633 6.357 9.523 0 13.155z"
            opacity="0.15"
          ></path>
          <circle
            cx="238.044"
            cy="75.044"
            r="25.044"
            fill="#59B5F8"
            stroke="#151515"
            strokeWidth="1.5"
          ></circle>
          <path
            fill="#151515"
            d="M238.044 100.088c13.831 0 25.044-11.213 25.044-25.044 0-.736-.032-1.464-.094-2.183-1.106 10.61-11.854 18.938-24.95 18.938s-23.844-8.327-24.95-18.939c-.062.72-.094 1.448-.094 2.184 0 13.831 11.213 25.044 25.044 25.044zm-9.286-48.31a29.57 29.57 0 019.286-1.473c3.281 0 6.414.523 9.286 1.473A24.98 24.98 0 00238.044 50c-3.281 0-6.414.63-9.286 1.778z"
          ></path>
          <path
            stroke="#151515"
            strokeWidth="1.5"
            d="M238.044 100.088c13.831 0 25.044-11.213 25.044-25.044 0-.736-.032-1.464-.094-2.183-1.106 10.61-11.854 18.938-24.95 18.938s-23.844-8.327-24.95-18.939c-.062.72-.094 1.448-.094 2.184 0 13.831 11.213 25.044 25.044 25.044zm-9.286-48.31a29.57 29.57 0 019.286-1.473c3.281 0 6.414.523 9.286 1.473A24.98 24.98 0 00238.044 50c-3.281 0-6.414.63-9.286 1.778z"
          ></path>
        </motion.g>
        <motion.g
          id="greySlice"
          variants={animateIn("left", 1, 2)}
          initial="from"
          animate="to"
          style={{ opacity: fadeOut }}
        >
          <path
            fill="#151515"
            fillOpacity="0.2"
            d="M-127 64.707l124.295 71.672 76.248-43.707L-50.75 21-127 64.707z"
          ></path>
          <path
            d="M-127 24.70679L-2.706 96.3788V114.8252L-127 43.1532V24.70679Z"
            fill="#151515"
            stroke="#151515"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fill="#EEE"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M-127 24.707L-2.705 96.379l76.248-43.707L-50.75-19-127 24.707z"
          ></path>
          <path
            fill="#fff"
            stroke="#151515"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M-2.707 114.825V96.378l76.249-43.706v18.446l-76.249 43.707z"
          ></path>
          <g stroke="#151515" strokeWidth="2">
            <path
              fill="#505050"
              d="M-17.415 11.982c1.48-.854 3.88-.853 5.357.003l27.507 15.94c1.376.797 1.464 2.071.2 2.929-1.418.963-3.958 1.023-5.506.129l-27.558-15.91c-1.478-.854-1.478-2.238 0-3.091z"
            ></path>
            <path
              fill="#151515"
              strokeLinejoin="round"
              d="M15.448 30.548l-27.507-15.94v-2.623l27.507 15.94c1.329.77 1.456 1.984.326 2.839a3.197 3.197 0 00-.326-.216z"
            ></path>
            <g>
              <path
                fill="#505050"
                d="M-50.864 5.422c1.48-.854 3.88-.853 5.358.002L24.679 46.01c1.274.737 1.458 1.894.438 2.752-1.326 1.116-4.081 1.263-5.739.306L-50.864 8.514c-1.478-.854-1.478-2.238 0-3.092z"
              ></path>
              <path
                fill="#151515"
                strokeLinejoin="round"
                d="M24.677 48.634L-45.508 8.047V5.424L24.677 46.01c1.275.737 1.459 1.894.438 2.752-.035.03-.072.06-.11.088a3.156 3.156 0 00-.328-.216z"
              ></path>
              <g>
                <path
                  fill="#505050"
                  d="M-48.36 16.787c1.48-.854 3.88-.854 5.357.002L7.9 46.24c1.32.764 1.463 1.973.336 2.833-1.372 1.047-4.03 1.153-5.639.225l-50.956-29.42c-1.479-.853-1.479-2.237 0-3.091z"
                ></path>
                <path
                  fill="#151515"
                  strokeLinejoin="round"
                  d="M7.897 48.864l-50.901-29.452V16.79L7.897 46.24c1.32.764 1.464 1.973.336 2.834l-.008.006a3.204 3.204 0 00-.328-.216z"
                ></path>
              </g>
            </g>
          </g>
          <g stroke="#151515" strokeLinejoin="round" strokeWidth="2">
            <path
              fill="#505050"
              d="M-111.258 24.863l108.852 62.31 27.26-15.74-108.852-62.31-27.26 15.74z"
            ></path>
            <path
              fill="#151515"
              d="M-84 9.122l108.852 62.31-5.704 3.294L-84 15.68V9.122z"
            ></path>
          </g>
        </motion.g>
      </motion.svg>
      {isFilled.linkToMedia(slice.primary.video_mp4) && (
        <div className="container">
          <div className="md:grid md:grid-cols-12 md:gap-x-6 mt-16">
            <BorderWrap className="md:col-span-10 md:col-start-2" theme={theme}>
              <video
                id="heroVideo"
                ref={videoRef}
                className="w-full h-full object-cover"
                src={slice.primary.video_mp4.url}
                loop
                muted
                playsInline
                poster={
                  isFilled.image(slice.primary.video_poster)
                    ? slice.primary.video_poster.url
                    : ""
                }
              >
                <source src={slice.primary.video_mp4.url} type="video/mp4" />
                {isFilled.linkToMedia(slice.primary.video_webm) && (
                  <source
                    src={slice.primary.video_webm.url}
                    type="video/webm"
                  />
                )}
              </video>
            </BorderWrap>
          </div>
        </div>
      )}
    </div>
  );
};
