// 'use client';

// import { Dialog } from '@headlessui/react';

// type Props = {
//     isOpen: boolean;
//     onClose: () => void;
//     questionsLength: number;
//     currentIndex: number;
//     answers: (number | null)[];
//     doubtFlags: boolean[];
//     onSelect: (index: number) => void;
// };

// export default function QuestionModal({
//     isOpen,
//     onClose,
//     questionsLength,
//     currentIndex,
//     answers,
//     doubtFlags,
//     onSelect,
// }: Props) {
//     const getStatusColor = (index: number) => {
//         if (answers[index] !== null && doubtFlags[index]) return 'bg-orange-400';
//         if (answers[index] !== null) return 'bg-green-500';
//         return 'bg-gray-400';
//     };

//     return (
//         <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
//             <div className="fixed inset-0 bg-black/30" />
//             <div className="fixed inset-0 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg p-4 max-w-md w-full">
//                     <h2 className="text-lg font-semibold mb-4 text-black">NOMOR SOAL</h2>
//                     <div className="grid grid-cols-5 gap-2">
//                         {Array.from({ length: questionsLength }).map((_, index) => (
//                             <button
//                                 key={index}
//                                 className={w - 10 h-10 rounded text-white font-bold ${getStatusColor(index)} ${ currentIndex === index ? 'ring-2 ring-blue-500' : ''}}
//                         onClick={() => {
//                             onSelect(index);
//                             onClose();
//                         }}
// >
//                         {index + 1}
//                     </button>
// ))}
//                 </div>
//                 <button className="mt-6 w-full bg-gray-200 py-2 rounded" onClick={onClose}>
//                     Tutup
//                 </button>
//             </div>
//         </div>
// </Dialog >
// );
// }