"use client";
import React from "react";
import Link from "next/link";

type Crumb = { name: string; href?: string };

interface BreadcrumbProps {
  crumbs?: Crumb[]; // make optional
}

const Breadcrumb = ({ crumbs = [] }: BreadcrumbProps) => {
  const lastCrumb = crumbs.length > 0 ? crumbs[crumbs.length - 1] : null;

  return (
    <div className="border-b pb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-center sm:text-left">
          {lastCrumb ? lastCrumb.name : "Untitled"}
        </h1>

        {/* Breadcrumbs (hidden on mobile) */}
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="hidden sm:block text-sm text-gray-500 text-center sm:text-right"
          >
            <ol className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                  <li key={c.name} className="flex items-center gap-2">
                    {!isLast && c.href ? (
                      <Link
                        href={c.href}
                        className="hover:text-gray-700 transition"
                      >
                        {c.name}
                      </Link>
                    ) : (
                      <span className="text-gray-700 font-medium">
                        {c.name}
                      </span>
                    )}
                    {!isLast && <span className="text-gray-400">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
