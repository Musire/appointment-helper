'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useMemo, useState } from 'react';

type Props<T> = {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    itemsPerPage?: number;
    containerClassName?: string;
};

export default function PaginationDisplay<T>({ 
    items, 
    itemsPerPage = 10, 
    renderItem,
    containerClassName = "space-y-2 p-1"
}: Props<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    useMemo(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [items.length, totalPages, currentPage]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const currentItems = useMemo(() => {
        return items.slice(startIndex, endIndex);
    }, [items, startIndex, endIndex]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        // Wrapper container manages the overall layout height and flex structure
        <div className="flex flex-col flex-1 overflow-y-hidden  justify-between">
            
            {/* Scrollable grid/list container for items */}
            <div className={`flex-1 overflow-y-auto scrollbar-adjust pr-4  ${containerClassName}`}>
                {currentItems.map((item, index) => renderItem(item, startIndex + index))}
            </div>

            {/* Fixed Pagination Controls Footer */}
            <div className="flex items-center justify-between border-t bg-background pt-3 pb-1 mt-2 shrink-0">
                {/* Bottom Left: Info Text */}
                <div>
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{items.length === 0 ? 0 : startIndex + 1}</span> to{' '}
                        <span className="font-medium">
                            {Math.min(endIndex, items.length)}
                        </span>{' '}
                        of <span className="font-medium">{items.length}</span> results
                    </p>
                </div>

                {/* Bottom Right: Navigation Buttons */}
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md border bg-background p-2 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={currentPage === page ? 'page' : undefined}
                                className={`relative inline-flex items-center border px-3 py-1.5 text-sm font-semibold focus:z-20 ${
                                    currentPage === page
                                        ? 'z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2'
                                        : 'bg-background text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md border bg-background p-2 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
