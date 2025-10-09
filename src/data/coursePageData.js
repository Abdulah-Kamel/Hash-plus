import courseVideo from "../assets/course_video.jpg";

export const courseHeroData = {
  title: 'دورة JavaScript',
  video: courseVideo,
  tabs: [
    { id: 1, label: 'تقدمك', icon: 'progress', active: false },
    { id: 2, label: 'قيم الدورة', icon: 'star', active: false },
    { id: 3, label: 'شارك الدورة', icon: 'share', active: false },
  ],
  description: {
    title: 'وصف الدورة',
    content: 'معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.',
    link: 'عرض المزيد',
  },
  requirements: {
    title: 'متطلبات الدخول في الدورة',
    items: [
      'معرفة بلغة اللغة العربية و الانجليزية',
      'جهاز كمبيوتر او لابتوب او حتى جوال لمتابعة',
      'معرفة الدخول للمنصات في الدورة او اي دورة',
      'الالتزام بحضور الدورة',
      'الالتزام بحل الواجبات بعد كل درس او دورة',
      'الالتزام بالحل الصحيح في الدورة',
    ],
  },
  outcomes: {
    title: 'ماذا سوف تتعلم؟',
    items: [
      { id: 1, label: 'سوف تتعلم البداية', checked: true },
      { id: 2, label: 'سوف تتعلم كيفية', checked: false },
      { id: 3, label: 'سوف تتعلم البداية', checked: false },
      { id: 4, label: 'سوف تتعلم كيفية', checked: false },
      { id: 5, label: 'سوف تتعلم البداية', checked: false },
      { id: 6, label: 'سوف تتعلم كيفية', checked: false },
    ],
  },
};

export const courseSidebarData = {
  title: 'محتوى الدورة',
  subtitle: 'للدورة 6 محاضرات',
  sections: [
    {
      id: 1,
      title: 'القسم 1 - تعريف بالدورة',
      duration: '22 دقيقة',
      progress: '10/6',
      lessons: [
        { id: 1, title: 'اختبار', type: 'quiz', completed: true, duration: '' },
        { id: 2, title: '01 - تعريف بالمنصة', type: 'video', completed: false, duration: '2:35' },
        { id: 3, title: '02 - تعريف بالدورة', type: 'video', completed: false, duration: '2:35' },
        { id: 4, title: '03 - شرح عن المحاضرات', type: 'video', completed: false, duration: '2:35' },
        { id: 5, title: '04 - ما الذي سوف نتعلم به في الدورة', type: 'video', completed: false, duration: '2:35' },
        { id: 6, title: '05 - هل هناك متطلبات للمحتوى في البداية؟', type: 'video', completed: false, duration: '2:35' },
        { id: 7, title: '06 - ما سوف نحتاجه لبداية الدورة', type: 'video', completed: false, duration: '2:35' },
      ],
      expanded: true,
    },
    {
      id: 2,
      title: 'القسم 2 - شرح الاساسيات',
      duration: '22 دقيقة',
      progress: '10/0',
      lessons: [],
      expanded: false,
    },
    {
      id: 3,
      title: 'القسم 3 - مشروع متجر الكتروني',
      duration: '22 دقيقة',
      progress: '10/0',
      lessons: [],
      expanded: false,
    },
    {
      id: 4,
      title: 'القسم 4 - مشروع 2',
      duration: '22 دقيقة',
      progress: '10/0',
      lessons: [],
      expanded: false,
    },
    {
      id: 5,
      title: 'القسم 5 - مشروع 3',
      duration: '22 دقيقة',
      progress: '10/0',
      lessons: [],
      expanded: false,
    },
    {
      id: 6,
      title: 'القسم 6 - الاختبار النهائي و الشهادة',
      duration: '22 دقيقة',
      progress: '10/0',
      lessons: [],
      expanded: false,
    },
  ],
};
