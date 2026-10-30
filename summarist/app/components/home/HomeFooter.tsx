const columns = [
  { title: 'Actions', links: ['Summarist Magazine', 'Cancel Subscription', 'Help', 'Contact us'] },
  { title: 'Useful Links', links: ['Pricing', 'Summarist Business', 'Gift Cards', 'Authors & Publishers'] },
  { title: 'Company', links: ['About', 'Careers', 'Partners', 'Code of Conduct'] },
  { title: 'Other', links: ['Sitemap', 'Legal Notice', 'Terms of Service', 'Privacy Policies'] },
];

export default function HomeFooter() {
  return (
    <footer className="bg-[#f1f6f4] py-10">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        <div className="mb-16 mt-8 flex flex-col gap-8 text-sm md:flex-row md:justify-between">
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-4 text-lg font-semibold text-[#032b41]">{title}</h4>
              {/* Not links yet: the original shows a not-allowed cursor. */}
              {links.map((label) => (
                <p key={label} className="mb-3 cursor-not-allowed text-sm leading-none text-[#394547] last:mb-0">
                  {label}
                </p>
              ))}
            </div>
          ))}
        </div>
        <p className="flex justify-center font-medium text-[#032b41]">
          Copyright &copy; {new Date().getFullYear()} Summarist.
        </p>
      </div>
    </footer>
  );
}
