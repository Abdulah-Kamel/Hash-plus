import MonitorIcon from "../assets/video.svg"
import certifacte from "../assets/certifacte.svg"
import course_icon3 from "../assets/course_icon3.svg";
import chessboard from "../assets/chessboard.svg";

export const growthIcons = [
  {
    id: 1,
    Icon: MonitorIcon,
    position: 'top-left',
    color: 'bg-indigo-500',
    rotation: '-rotate-12',
    hasColor: true,
  },
  {
    id: 2,
    Icon: certifacte,
    position: 'bottom-right',
    color: 'bg-teal-400',
    rotation: 'rotate-12',
    hasColor: true,
  },
  {
    id: 3,
    Icon: course_icon3,
    position: 'bottom-left',
    color: '',
    rotation: '-rotate-6',
    hasColor: false,
  },
  {
    id: 4,
    Icon: chessboard,
    position: 'top-right',
    color: '',
    rotation: 'rotate-6',
    hasColor: false,
  },
];

export const growthContent = {
  badge: 'عن المنصة',
  title: 'بوابتك للنمو',
  titleHighlight: 'الشخصي',
  subtitle: 'والمهني معاً',
  description: 'معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.',
};
