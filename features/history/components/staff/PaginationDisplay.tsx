
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

    // Derive a valid page without updating state during render.
    const activePage = Math.min(currentPage, totalPages);

    const startIndex = (activePage - 1) * itemsPerPage;
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
        <div className="flex flex-1 flex-col justify-between overflow-y-hidden">

            {/* Scrollable grid/list container */}
            <div className={`flex-1 overflow-y-auto scrollbar-adjust pr-4 ${containerClassName}`}>
                {currentItems.map((item, index) => renderItem(item, startIndex + index))}
            </div>

            {/* Pagination Controls Footer */}
            <div className="mt-2 flex shrink-0 items-center justify-between border-t bg-background pb-1 pt-3">

                {/* Results Information */}
                <div>
                    <p className="text-sm text-muted-foreground">
                        Showing{' '}
                        <span className="font-medium">
                            {items.length === 0 ? 0 : startIndex + 1}
                        </span>
                        {' '}to{' '}
                        <span className="font-medium">
                            {Math.min(endIndex, items.length)}
                        </span>
                        {' '}of{' '}
                        <span className="font-medium">{items.length}</span>
                        {' '}results
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            onClick={() => handlePageChange(activePage - 1)}
                            disabled={activePage === 1}
                            className="relative inline-flex items-center rounded-l-md border bg-background p-2 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                aria-current={activePage === page ? 'page' : undefined}
                                className={`relative inline-flex items-center border px-3 py-1.5 text-sm font-semibold focus:z-20 ${
                                    activePage === page
                                        ? 'z-10 bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2'
                                        : 'bg-background text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(activePage + 1)}
                            disabled={activePage === totalPages}
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
