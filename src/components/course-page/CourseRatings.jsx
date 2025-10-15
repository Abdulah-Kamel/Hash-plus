import React from 'react';
import { Star } from 'lucide-react';

const RatingBar = ({ stars, percentage }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center">
                <span className="text-sm text-gray-600 font-medium min-w-[3rem]">{percentage}%</span>

                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3" dir="ltr">
                <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const CourseRatings = () => {
    const ratingsData = [
        { stars: 5, percentage: 64 },
        { stars: 4, percentage: 10 },
        { stars: 3, percentage: 8 },
        { stars: 2, percentage: 6 },
        { stars: 1, percentage: 12 },
    ];

    return (
        <div className="py-6 px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Ratings Breakdown */}
                <div className="md:col-span-2 space-y-3">
                    {ratingsData.map((rating) => (
                        <RatingBar key={rating.stars} stars={rating.stars} percentage={rating.percentage} />
                    ))}

                </div>
                {/* Overall Rating */}
                <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                    <h2 className="text-5xl text-gray-800">4.5</h2>
                    <div className="flex items-center my-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : (i === 4 ? 'text-yellow-400' : 'text-gray-300')}`}
                            />
                        ))}
                    </div>
                    <p className="text-muted-foreground">التقييم</p>
                </div>
            </div>
        </div>
    );
};

export default CourseRatings;
