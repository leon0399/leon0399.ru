import tw, { styled } from "twin.macro"

const ContactBannerContainer = styled.section([
  tw`w-full max-w-4xl mx-auto rounded-2xl px-12 py-10 border`,
  tw`bg-indigo-600 border-indigo-800 text-gray-100`,
  tw`dark:bg-indigo-300 dark:border-indigo-600 dark:text-gray-900`
])

const TheContactBanner: React.FC<{ className?: string }> = ({ className }) => (
  <ContactBannerContainer className={className}>
    <h2 className="text-5xl font-bold leading-[150%]">Contact me</h2>
    <p className="text-lg my-2 text-gray-300 dark:text-gray-800">
      I’m not currently looking for any new opportunities, however my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
    </p>
    <div className="mt-6">
      <a
        href="mailto:hello@leon0399.ru"
        className="
          inline-flex justify-center items-center
          px-6 h-12
          rounded-lg font-semibold text-sm
          ring-offset-2 focus:outline-none focus:ring
          bg-gray-100 text-gray-900
          dark:bg-gray-900 dark:text-gray-100
        "
      >
        Hit me an email
      </a>
    </div>
  </ContactBannerContainer>
)

export default TheContactBanner