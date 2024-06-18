import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { socialsConfig } from "@/config/socials";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Shell } from "../dashboard/shell";
import { ThemeToggle } from "../theme-toggle";
import { BrandName } from "./brand-name";
import { SocialIconButton } from "./social-icon-button";
import BuyMeCoffee from "./buy-me-coffee";
import { Link } from "@/intl/navigation";

interface Props {
  className?: string;
}

export function MarketingFooter({ className }: Props) {
  const t = useTranslations("Layout.MarketingFooter");

  return (
    <footer className={cn("w-full", className)}>
      <Shell className="grid gap-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3">
            <div>
              <BrandName />
              <p className="mt-2 font-light text-muted-foreground text-sm">
                {t("tagline")}
              </p>
            </div>
          </div>
          <div className="order-2 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">
              {t("resources.title")}
            </p>
            <FooterLink
              href={siteConfig.links.telegram.channel}
              label={t("resources.links.announcements.title")}
            />
            {/* <FooterLink href="/pricing" label="Pricing" />
            <FooterLink href="https://docs.openstatus.dev" label="Docs" />
            <FooterLink href="/oss-friends" label="OSS Friends" />
            <FooterLink href="/status" label="External Providers Monitoring" /> */}
          </div>
          <div className="order-3 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">
              {t("company.title")}
            </p>
            <FooterLink href="/about" label="About" />
            {/* <FooterLink href="/changelog" label="Changelog" /> */}
            <FooterLink
              href="/legal/terms"
              label={t("company.links.terms.title")}
            />
            <FooterLink
              href="/legal/privacy"
              label={t("company.links.privacy.title")}
            />
          </div>
          <div className="order-3 flex flex-col gap-3 text-sm">
            <p className="font-semibold text-foreground">{t("tools.title")}</p>
            <FooterLink
              href={siteConfig.links.piNetwork}
              label={t("tools.links.pi.title")}
            />
            {/* <FooterLink href="https://openstat.us" label="All Status Codes" /> */}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {socialsConfig.map(({ title, href, icon }) => (
              <SocialIconButton key={title} {...{ href, icon, title }} />
            ))}
            <BuyMeCoffee />
          </div>
          <div className="text-right md:text-left">
            <ThemeToggle />
          </div>
        </div>
      </Shell>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
  const isExternal = external || href.startsWith("http");

  const externalProps = isExternal
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return (
    <Link
      className="inline-flex w-fit items-center text-muted-foreground underline underline-offset-4 hover:text-foreground hover:no-underline"
      href={href}
      {...externalProps}
    >
      {label}
      {isExternal ? (
        <ArrowUpRight className="ml-1 h-4 w-4 flex-shrink-0" />
      ) : null}
    </Link>
  );
}
