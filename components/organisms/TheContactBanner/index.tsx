import tw, { styled } from "twin.macro"

const ContactBannerContainer = styled.section([
  tw`w-full max-w-4xl mx-auto rounded-2xl px-12 py-10 border text-center md:text-left`,
  tw`bg-indigo-600 border-indigo-800 text-gray-100`,
  tw`dark:bg-indigo-300 dark:border-indigo-600 dark:text-gray-900`
])

const TheContactBanner: React.FC<{ className?: string }> = ({ className }) => (
  <ContactBannerContainer className={className}>
    <h2 className="text-3xl font-bold leading-[150%] md:text-5xl">Contact me</h2>
    <p className="my-2 text-gray-200 dark:text-gray-800 md:text-lg">
      I’m not currently looking for any new opportunities, however my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
    </p>
    <div className="mt-6">
      <a
        href="mailto:hello@leon0399.ru"
        target="_blank"
        rel="noopener noreferrer"
        className="
          dark:bg-gray-900 dark:text-gray-100
          ring-offset-2 focus:outline-none focus:ring
          flex md:inline-flex justify-center items-center
          px-6 h-12
          rounded-lg font-semibold text-sm text-center
          bg-gray-100 text-gray-900
        "
      >
        Hit me an email
      </a>
    </div>
  </ContactBannerContainer>
)

export default TheContactBanner