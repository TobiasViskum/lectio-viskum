"use client";

import { useEffect } from "react";

export function Tester() {
  //  viewFile (docID: string, isLocalDoc: boolean) {
  //     const newWindow = window.open (this.formService.setLoadingUrl ());
  //     setTimeout (() => {
  //         this.spinner.show ();
  //         this.formService.viewFile (docID, isLocalDoc).subscribe ((data: any) => {
  //             this.spinner.hide ();
  //             setTimeout (() => {
  //                 newWindow.location.href = window.URL.createObjectURL (data);
  //                 if (data.type === 'application/octet-stream') {
  //                     newWindow.close ();
  //                 }
  //             }, 500);
  //         }, (error) => {
  //             this.spinner.hide ();
  //             newWindow.close ();
  //             this.toastr.error (error);
  //         });
  //     }, 500);
  // }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLAnchorElement | null;
      if (target?.tagName.toLowerCase() === "a") {
        // Your logic here
        e.preventDefault(); // Prevent the default action

        window.open(target.href);
      }
    });
  }, []);

  return null;
}
